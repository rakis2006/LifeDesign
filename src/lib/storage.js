const AUTH_KEY = "lifedesign_auth";
const MODE_KEY = "lifedesign_mode";
const VALUES_KEY = "lifedesign_values";
const FLOW_KEY = "lifedesign_flow_answers";
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

export function getMode() {
  return localStorage.getItem(MODE_KEY) || "";
}

export function setMode(mode) {
  localStorage.setItem(MODE_KEY, mode);
}

export function startGuestMode() {
  setMode("guest");
  clearAuth();
  localStorage.removeItem(VALUES_KEY);
  localStorage.removeItem(FLOW_KEY);
  localStorage.removeItem(PLAN_KEY);
  localStorage.removeItem(TODAY_KEY);
}

const FLOW_DEFAULTS = {
  vision: "",
  hanvision: "",
  mission: "",
  bossfight: "",
  quests: "",
  rules: "",
};

export function getFlowAnswers() {
  const saved = readJson(FLOW_KEY, FLOW_DEFAULTS);
  return {
    vision: saved?.vision ?? "",
    hanvision: saved?.hanvision ?? "",
    mission: saved?.mission ?? "",
    bossfight: saved?.bossfight ?? "",
    quests: saved?.quests ?? "",
    rules: saved?.rules ?? "",
  };
}

export function setFlowAnswer(field, value) {
  const current = getFlowAnswers();
  writeJson(FLOW_KEY, { ...current, [field]: value ?? "" });
}

export function setFlowAnswers(nextAnswers) {
  const current = getFlowAnswers();
  writeJson(FLOW_KEY, { ...current, ...nextAnswers });
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
  if (tasks.length === 0) {
    return defaults;
  }
  return tasks.map((task) => ({
    text: typeof task?.text === "string" ? task.text : "",
    done: Boolean(task?.done),
  }));
}

export function setTodayTasks(tasks) {
  const safeTasks = tasks.map((task) => ({
    text: task.text ?? "",
    done: Boolean(task.done),
  }));
  writeJson(TODAY_KEY, safeTasks);
}
