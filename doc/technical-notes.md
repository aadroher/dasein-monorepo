# Technical Notes: OR-Tools, Browsers, and Desktop Apps

## OR-Tools implementation

OR-Tools is implemented in C++ at its core. The Python, Java, and .NET APIs are thin SWIG-generated bindings over the native library, so calling CP-SAT from Python still runs the actual search in compiled C++ code.

## Hardware features used

CP-SAT uses **CPU parallelism**, not the GPU.

- **Multi-threaded portfolio search**: multiple solver strategies run in parallel across CPU cores (different search heuristics, LNS workers, feasibility pumps), sharing learned clauses and bounds. Controlled via `num_search_workers` / `num_workers`.
- **SIMD / vectorization**: whatever the C++ compiler emits; no hand-tuned vector code.
- **No GPU support**: CDCL-style SAT and CP search are branch-heavy and pointer-chasing, which maps poorly to GPU SIMT execution. GPU-accelerated SAT/CP exists in research but not in mainstream solvers (CP-SAT, Gurobi, CPLEX).

Scaling CP-SAT means more cores and RAM, not a bigger GPU.

## Running the solver in the browser (WASM)

There is **no official WASM build** of OR-Tools.

- A few community WASM ports exist (Emscripten-based) but are experimental forks, not maintained. CP-SAT pulls in protobuf and abseil, making the build painful and the resulting `.wasm` tens of MB.
- Browser-friendly alternatives:
  - **MiniZinc** has a JS/WASM build (Gecode or Chuffed backends) — probably the most production-ready CP-in-browser path today.
  - **Glucose / MiniSat** SAT solvers have working WASM builds.
  - **HiGHS** ships an official WASM build for LP/MIP.
  - **GLPK.js** / **javascript-lp-solver** for lighter MIP work.
- The common pattern is to run CP-SAT on a backend (FastAPI/Node service or serverless) and have the browser submit models and poll for results. This avoids WASM build issues and gives full multi-core parallelism.

## Does WASM support parallelism?

Yes, but with real caveats.

**What works:**

- **WASM threads** are standardized and shipped in all major browsers, built on Web Workers + `SharedArrayBuffer` + atomics. Emscripten can compile pthreads-based C++ to use them.
- **SIMD** is also standardized and widely supported.

**What's painful in practice:**

- **Cross-origin isolation**: `SharedArrayBuffer` is gated behind COOP/COEP headers; every cross-origin resource must opt in.
- **Worker startup cost**: each thread is a Web Worker, heavier than an OS thread.
- **Shared memory limits**: only `SharedArrayBuffer`-backed memory is shared; globals and TLS need care.
- **Core count**: `navigator.hardwareConcurrency` is often capped (e.g., Safari), and background tabs may be throttled.
- **CP-SAT specifically**: its parallel portfolio relies on shared clause DBs and atomics, which should map to WASM threads, but no public port has validated this.

For heavy native solvers in the browser, you'd be the one doing the porting and accepting reduced performance. A backend service remains the pragmatic choice for non-trivial timetabling workloads.

## Desktop app with web UI + local OR-Tools

A well-trodden path and likely the sweet spot for timetabling.

**Architectures:**

- **Electron**: Chromium UI + Node.js backend. Options for calling OR-Tools:
  - Community Node.js bindings (`node-or-tools`) — lags the C++ release.
  - Child process running Python with `ortools` (simplest and most reliable; ship a Python runtime).
  - Native N-API addons wrapping the C++ library (most work, best performance).
- **Tauri**: Rust backend + system webview. Smaller bundle (~10MB vs Electron's ~100MB+). Shell out to a Python sidecar or link OR-Tools from Rust.
- **Pywebview / Neutralino**: lighter wrappers where the UI is a thin shell over a Python process that owns the solver directly. Pywebview is clean for Python-first teams, since OR-Tools' Python API is the most polished.

**Advantages:**

- Full multi-core CP-SAT.
- No COOP/COEP headaches, no WASM build pain.
- Single installer bundling Python + `ortools` wheel; users don't set anything up.
- UI stays web-tech, reusable if a server-backed web version is built later.

**Tradeoffs:**

- Bundle size (Electron especially), macOS/Windows code-signing, and auto-update infrastructure.
- Cross-platform packaging of a Python+OR-Tools sidecar takes fiddling (PyInstaller or relocatable Python).

For timetabling tools used by school administrators — solves take minutes, run offline, benefit from every core — this fits better than a pure web app.
