import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState
} from '@ngrx/signals';

export interface HomeTaskState {
  todoHome: string[];
  doneHome: string[];
}

export const HomeTaskStore = signalStore(
  { providedIn: 'root' },
  withState<HomeTaskState>({ todoHome: [], doneHome: [] }),
  withMethods(state => ({
    setHomeState(task: string, complete: boolean) {
      patchState(
        state,
        setHomeTaskStatus(
          state.todoHome(),
          state.doneHome(),
          task,
          complete
        )
      );
    },
    completeAll() {
      patchState(state, {
        doneHome: [...state.doneHome(), ...state.todoHome()],
        todoHome: []
      });
    },
    homeTasksReceived(tasks: HomeTaskState) {
      patchState(state, tasks);
    }
  })),
  withHooks({
    onInit({ homeTasksReceived }) {
      homeTasksReceived({
        doneHome: [
          'cook dinner',
          'go grocery shopping',
          'sweep the floors',
          'do the laundry'
        ],
        todoHome: ['fix the leaky faucet', 'mow the lawn']
      });
    }
  })
);

// Necessary to inject HomeTaskStore as a type
export type HomeTaskStore = InstanceType<typeof HomeTaskStore>;

function setHomeTaskStatus(
  oldTodoHome: string[],
  oldDoneHome: string[],
  task: string,
  complete: boolean
): HomeTaskState {
  const todoHome = oldTodoHome.filter(x => x !== task);
  const doneHome = oldDoneHome.filter(x => x !== task);
  if (complete) {
    todoHome.push(task);
  } else {
    doneHome.push(task);
  }
  return { todoHome, doneHome };
}
