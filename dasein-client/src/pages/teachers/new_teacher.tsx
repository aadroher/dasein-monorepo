import { createSignal, createEffect } from "solid-js";
import { Replicache } from "replicache";
import { mainStore, setMainStore } from "../../stores/main";
import type { Teacher } from "../../domain/entities/teacher";
import { newTeacherEntity } from "../../domain/entities/teacher";
import * as Automerge from "@automerge/automerge";
import { Repo } from "@automerge/automerge-repo";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";

const [teacher, setTeacher] = createSignal<Teacher | null>(null);

const storageAdapter = new IndexedDBStorageAdapter("teacher-db");
const repo = new Repo({
  storage: storageAdapter,
  network: [new BroadcastChannelNetworkAdapter()],
});

const createTeacherDoc = ({ fullName, email }: Teacher) => {
  const doc = Automerge.from({
    fullName,
    email,
  });
  console.log("Automerge doc", doc);
  const handle = repo.create(doc);
  console.log("Handle", handle);
  return handle;
};

const NewTeacher = () => {
  createEffect(() => {
    console.log(teacher());
    console.log(mainStore.teachers);
  });

  return (
    <div class="w-xl mx-auto flex flex-col gap-4">
      <h1 class="text-2xl font-bold">New Teacher</h1>
      <form
        class="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          createTeacherDoc(teacher());
        }}
      >
        <div class="flex flex-col gap-2">
          <label for="fullName">Full Name</label>
          <input
            class="border border-gray-300 rounded-md p-2"
            type="text"
            id="fullName"
            value={teacher()?.fullName ?? null}
            onInput={(e) => {
              setTeacher({
                ...teacher(),
                fullName: e.target.value,
              });
            }}
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <input
            class="border border-gray-300 rounded-md p-2"
            type="email"
            id="email"
            value={teacher()?.email ?? null}
            onInput={(e) => {
              setTeacher({
                ...teacher(),
                email: e.target.value,
              });
            }}
          />
        </div>
        <div class="flex flex-col gap-2">
          <button class="bg-blue-500 text-white p-2 rounded-md">Save</button>
        </div>
      </form>
    </div>
  );
};

export { NewTeacher };
