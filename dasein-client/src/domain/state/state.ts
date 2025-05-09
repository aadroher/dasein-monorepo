import type {
  DocumentPayload,
  DeleteDocumentPayload,
  AnyDocumentId,
} from "@automerge/automerge-repo";
import type { Entity } from "../entities/entity";
import type { TeacherEntity, Teacher } from "../entities/teacher";

import { createStore } from "solid-js/store";

import { Repo } from "@automerge/automerge-repo";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { MessageChannelNetworkAdapter } from "@automerge/automerge-repo-network-messagechannel";
import { newTeacherEntity } from "../entities/teacher";

type Automergeable = {
  automergeId?: AnyDocumentId;
};
type AutomergeableTeacherEntity = TeacherEntity & Automergeable;

type State = {
  teachers: TeacherEntity[];
};

type Repository<T extends Entity> = {
  add: (item: Omit<T, keyof Entity>) => Promise<void>;
  remove: ({ id }: { id: string }) => Promise<T | void>;
  find: ({ id }: { id: string }) => T | void;
  list: () => T[];
};

type Repositories = {
  teachers: Repository<AutomergeableTeacherEntity>;
};

const createRepositories = (): Repositories => {
  console.log("🚨 Creating repositories");
  const [store, setStore] = createStore<State>({
    teachers: [],
  });

  const storageAdapter = new IndexedDBStorageAdapter("teacher-db");
  const networkAdapter = new BroadcastChannelNetworkAdapter({
    channelName: "dasein-main",
  });
  const automergeRepository = new Repo({
    storage: storageAdapter,
    network: [networkAdapter],
  });

  automergeRepository.on("document", async (event) => {
    console.log("🚨 New document event received");
    console.log("Event: ", event);
    const automergeDocumentId = event.handle.documentId;
    const automergeTeacherDocument = await event.handle.doc();
    console.log("Document: ", automergeTeacherDocument);
    setStore({
      teachers: automergeTeacherDocument,
    });
  });

  automergeRepository.on("delete-document", (event) => {
    console.log("🚨 Delete document event received");
    console.log("Event: ", event);
    const documentId = event.documentId;
    setStore({
      teachers: store.teachers.filter((teacher) => teacher.id !== documentId),
    });
  });

  automergeRepository.on("unavailable-document", (event) => {
    console.log("🚨 Unavailable document event received");
    console.log("Event: ", event);
  });

  const handle = automergeRepository.create<State>({
    teachers: [],
  });

  return {
    teachers: {
      add: async (item) => {
        console.log("🚨 Add teacher", item);
        const handles = automergeRepository.handles;
        console.log("🚨 Handles", handles);
        const teacherEntity = newTeacherEntity(item);

        const document = await handle.doc();
        console.log("🚨 Document", document);
        document.teachers.push(teacherEntity);
      },
      remove: async ({ id }) => {
        console.log("🚨 Remove teacher", id);

        const teacher = store.teachers.find((teacher) => teacher.id === id);

        await handle.whenReady();
        handle.change((document) => {
          document.teachers = document.teachers.filter(
            (teacher) => teacher.id !== id
          );
        });
      },
      find: ({ id }) => {
        return store.teachers.find((teacher) => teacher.id === id);
      },
      list: () => {
        return store.teachers;
      },
    },
  };
};

const repositories = createRepositories();

export { createRepositories, repositories };
