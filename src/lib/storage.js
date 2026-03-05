const AUTH_KEY = "lifedesign_auth";
const VALUES_KEY = "lifedesign_values";
const PLAN_KEY = "lifedesign_plan";
const TODAY_KEY = "lifedesign_today";

function readJson(key, fallbackValue) {
  const rawValue = localStorage.getItem(key);
  if (!rawValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return fallbackValue;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setAuthenticated(isAuth) {
  localStorage.setItem(AUTH_KEY, isAuth ? "true" : "false");
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function getValues() {
  const values = readJson(VALUES_KEY, []);
  return Array.isArray(values) ? values : [];
}

export function setValues(values) {
  writeJson(VALUES_KEY, values);
}

export function isValuesCompleted() {
  return getValues().filter((value) => typeof value === "string" && value.trim() !== "").length >= 3;
}

export function getPlan() {
  const defaultPlan = { vision: "", yearGoal: "", monthGoal: "" };
  const plan = readJson(PLAN_KEY, defaultPlan);
  return {
    vision: plan?.vision ?? "",
    yearGoal: plan?.yearGoal ?? "",
    monthGoal: plan?.monthGoal ?? "",
  };
}

export function setPlan(plan) {
  writeJson(PLAN_KEY, {
    vision: plan.vision ?? "",
    yearGoal: plan.yearGoal ?? "",
    monthGoal: plan.monthGoal ?? "",
  });
}

export function getTodayTasks() {
  const defaults = [
    { text: "", done: false },
    { text: "", done: false },
    { text: "", done: false },
  ];
  const tasks = readJson(TODAY_KEY, defaults);
  if (!Array.isArray(tasks)) {
    return defaults;
  }

  return defaults.map((defaultTask, index) => {
    const task = tasks[index] || defaultTask;
    return {
      text: typeof task.text === "string" ? task.text : "",
      done: Boolean(task.done),
    };
  });
}

export function setTodayTasks(tasks) {
  const safeTasks = tasks.slice(0, 3).map((task) => ({
    text: task.text ?? "",
    done: Boolean(task.done),
  }));
  writeJson(TODAY_KEY, safeTasks);
}
