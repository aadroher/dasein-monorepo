# Educational Timetabling: A General Introduction

Educational timetabling is the problem of assigning *events* (lectures, exams, classes) to *resources* (rooms, time slots, teachers, student groups) subject to **hard constraints** (no teacher in two places at once) while optimizing **soft constraints / desiderata** (compact schedules, balanced workloads, preferred time windows). It is **NP-hard**, and is one of the longest-studied benchmark problems in operations research and AI.

## 1. The three canonical problem families

The community has converged on three subfamilies, each with its own benchmark instances and competition tracks:

1. **High School Timetabling (HSTT)** — fixed groups of students, many teachers, weekly recurrence. Standardized via the **XHSTT** XML archive.
2. **University Course Timetabling (UCTP)** — split into:
   - *Curriculum-Based* (CB-CTT): conflicts derived from curricula (Udine benchmark).
   - *Post-Enrolment* (PE-CTT): conflicts derived from actual student enrolments.
3. **Examination Timetabling** — spreading exams to minimize student conflicts and clustering.

Ceschia, Di Gaspero & Schaerf (2023) is the current reference survey covering all three, with a unified notation and pointers to the best-known results per benchmark.

## 2. Solution techniques (the methodological landscape)

- **Exact methods**: ILP/MIP (CPLEX, Gurobi), Constraint Programming (Gecode, OR-Tools, MiniZinc, CP-SAT), SAT/MaxSAT, ASP. Strong for small/medium instances and proving optimality.
- **Metaheuristics**: Simulated Annealing (still SOTA on several ITC tracks via *multi-neighbourhood SA*), Tabu Search, Large Neighbourhood Search, Genetic / Memetic algorithms, Iterated Local Search.
- **Hybrid / matheuristics**: CP or MIP for feasibility + metaheuristic for quality. This is the pragmatic mainstream today.
- **Hyper-heuristics & learning-augmented search**: choosing or generating low-level heuristics; recently, ML-guided variable/value ordering and RL-based neighbourhood selection.
- **Decomposition** (e.g., Benders, column generation) for very large or multi-campus problems.

## 3. Benchmarks and competitions you should know

- **PATAT** (Practice and Theory of Automated Timetabling) — the biennial conference; the de-facto venue.
- **International Timetabling Competition (ITC)** — three editions (2002, 2007, 2019). **ITC-2019** is the current frontier: 30 real-world instances from UniTime users, combining time/room assignment with **student sectioning**.
- **XHSTT-2014** — the standard high-school archive (~50 datasets from 11+ countries) with a public evaluator.
- **Udine CB-CTT** — long-running curriculum-based reference.

## 4. Open-source systems (useful for prototyping or production)

- **UniTime** — the most mature open-source academic scheduling platform; runs on a CP/ILP backend, used by many universities.
- **FET** — desktop solver popular in schools; uses a recursive-swap heuristic.
- **OptaPlanner / Timefold** — Java constraint-satisfaction solver with built-in school/employee scheduling examples; widely used in industry.
- **Google OR-Tools (CP-SAT)** — extremely strong general-purpose CP solver; good first choice for custom models.
- **MiniZinc** — modeling language to compare CP/MIP/SAT backends without rewriting.

## 5. Where the field is going

- Combining **constraint programming** with **simulated annealing / LNS** dominates the leaderboards.
- Increasing interest in **multi-objective** formulations (fairness, sustainability, well-being of students/teachers) instead of a single weighted score.
- **Robust** and **online / dynamic** timetabling — handling enrolment changes, sickness, room failures.
- **Learning to optimize**: graph neural networks for variable selection, RL for operator selection, LLM-assisted constraint elicitation from natural-language requirements.
- **Student-centric** sectioning (closer to ITC-2019's flavor) replacing the older "events-only" view.

## Recommended starting reading

- Ceschia, Di Gaspero, Schaerf (2023), *Educational timetabling: Problems, benchmarks, and state-of-the-art results* — the single best entry point.
- Müller, Rudová & Müllerová (2023), *Real-world university course timetabling at ITC-2019* — describes the current canonical benchmark.
- Post et al. (2014), *XHSTT: an XML archive for high school timetabling…* — the HSTT standard.
- Van Bulck, Goossens & Schaerf (2025), *Multi-neighbourhood simulated annealing for the ITC-2007 capacitated examination timetabling problem* — a recent SOTA result.

## Sources

- [Educational timetabling: Problems, benchmarks, and state-of-the-art results (Ceschia et al., EJOR 2023)](https://www.sciencedirect.com/science/article/pii/S0377221722005641)
- [Preprint of the same survey on arXiv (2201.07525)](https://arxiv.org/abs/2201.07525)
- [A survey of optimisation methodologies in school timetabling problems (ESWA)](https://www.sciencedirect.com/science/article/abs/pii/S0957417420307314)
- [A Survey of University Course Timetabling Problem: Perspectives, Trends and Opportunities](https://www.researchgate.net/publication/353503798_A_Survey_of_University_Course_Timetabling_Problem_Perspectives_Trends_and_Opportunities)
- [Meta-heuristic approaches for the University Course Timetabling Problem (2023)](https://www.sciencedirect.com/science/article/pii/S2667305323000789)
- [Real-world university course timetabling at ITC-2019 (Journal of Scheduling, 2025)](https://link.springer.com/article/10.1007/s10951-023-00801-w)
- [ITC-2019 / PATAT 2018 paper (PDF)](https://www.itc2019.org/papers/itc2019-patat2018.pdf)
- [PATAT — Educational Timetabling papers index](https://patat.cs.kuleuven.be/application-area/educational-timetabling/papers)
- [UniTime — University Course Timetabling Benchmark Datasets](https://www.unitime.org/uct_datasets.php)
- [UniTime — Examination Timetabling Benchmark Datasets](https://www.unitime.org/exam_datasets.php)
- [XHSTT: an XML archive for high school timetabling problems (Annals of OR)](https://link.springer.com/article/10.1007/s10479-011-1012-2)
- [University of Twente — High School Timetabling Project (HSTT)](https://www.utwente.nl/en/eemcs/dmmp/hstt/)
- [Post-Enrolment Course Timetabling with Flexible Teacher Assignments (2025, Springer)](https://link.springer.com/chapter/10.1007/978-3-032-09156-7_21)
