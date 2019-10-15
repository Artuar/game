import { Store, createStore, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "app/store/rootReducer";
import { RootState } from "app/store/rootState";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "app/store/rootEpic";
import { RootAction } from "app/store/rootActions";
import { services, Services } from "app/services/rootServices";

export const logger: Middleware = () => next => action => {
  if (process.env.NODE_ENV !== "production") {
    console.log(action);
  }
  return next(action);
};

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services
});

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(logger, epicMiddleware);

  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware);
  }

  const store: Store<RootState> = createStore(
    rootReducer,
    initialState,
    middleware
  );

  if (module.hot) {
    module.hot.accept("app/store/rootReducer", () => {
      const nextReducer = require("app/store/rootReducer");
      store.replaceReducer(nextReducer);
    });
  }

  epicMiddleware.run(rootEpic);

  return store;
}
