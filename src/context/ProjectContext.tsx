import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { materialById } from "../data/materials";
import {
  BUDGET_IDS,
  defaultProject,
  GOAL_IDS,
  ROOM_IDS,
  STORAGE_KEY,
  STYLE_IDS,
  type BudgetId,
  type GoalId,
  type MaterialSelection,
  type ProjectState,
  type RoomId,
  type StyleId,
} from "../types/project";
import { suggestedQuantity } from "../utils/estimate";
import { fileToDataUrl, isAcceptedImage, urlToDataUrl } from "../utils/image";

type Toast = { id: number; message: string };

type ProjectContextValue = {
  project: ProjectState;
  toasts: Toast[];
  dismissToast: (id: number) => void;
  notify: (message: string) => void;
  setImageFromFile: (file: File) => Promise<void>;
  setImageFromUrl: (url: string, label: string) => Promise<void>;
  clearImage: () => void;
  setRoom: (roomId: RoomId) => void;
  setBudget: (budgetId: BudgetId) => void;
  toggleStyle: (styleId: StyleId) => void;
  toggleGoal: (goalId: GoalId) => void;
  setStep: (step: number) => void;
  selectDesign: (id: string, name: string) => void;
  addMaterial: (id: string) => void;
  removeMaterial: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  useSuggestedQuantity: (id: string) => void;
  setRoomSize: (size: number) => void;
  markAnalyzed: () => void;
  toggleDiy: (id: string, title: string) => void;
  resetDemo: () => void;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

function isRoom(value: unknown): value is RoomId {
  return typeof value === "string" && ROOM_IDS.includes(value as RoomId);
}
function isBudget(value: unknown): value is BudgetId {
  return typeof value === "string" && BUDGET_IDS.includes(value as BudgetId);
}
function isStyle(value: unknown): value is StyleId {
  return typeof value === "string" && STYLE_IDS.includes(value as StyleId);
}
function isGoal(value: unknown): value is GoalId {
  return typeof value === "string" && GOAL_IDS.includes(value as GoalId);
}

function loadProject(): ProjectState {
  const base = defaultProject();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<ProjectState>;
    const materials = Array.isArray(parsed.materials)
      ? parsed.materials.filter(
          (item): item is MaterialSelection =>
            !!item &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            typeof item.quantity === "number",
        )
      : [];
    return {
      ...base,
      imageDataUrl: typeof parsed.imageDataUrl === "string" ? parsed.imageDataUrl : null,
      imageLabel: typeof parsed.imageLabel === "string" ? parsed.imageLabel : null,
      roomId: isRoom(parsed.roomId) ? parsed.roomId : null,
      budgetId: isBudget(parsed.budgetId) ? parsed.budgetId : null,
      styles: Array.isArray(parsed.styles) ? parsed.styles.filter(isStyle) : [],
      goals: Array.isArray(parsed.goals) ? parsed.goals.filter(isGoal) : [],
      step: typeof parsed.step === "number" ? Math.min(4, Math.max(0, parsed.step)) : 0,
      selectedDesignId: typeof parsed.selectedDesignId === "string" ? parsed.selectedDesignId : null,
      materials: materials.map((item) => ({
        id: item.id,
        quantity: Math.max(1, Math.round(item.quantity)),
        custom: Boolean(item.custom),
      })),
      roomSize: typeof parsed.roomSize === "number" ? Math.min(800, Math.max(40, parsed.roomSize)) : 180,
      analyzed: Boolean(parsed.analyzed),
      diy: parsed.diy && typeof parsed.diy === "object" ? { ...parsed.diy } : {},
    };
  } catch {
    return base;
  }
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<ProjectState>(loadProject);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(1);
  const ready = useRef(false);

  const notify = useCallback((message: string) => {
    const id = toastId.current++;
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3400);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    if (!ready.current) {
      ready.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    } catch {
      notify("This browser could not store the project. Try a smaller photo.");
    }
  }, [project, notify]);

  const setImageFromFile = useCallback(
    async (file: File) => {
      if (!isAcceptedImage(file)) {
        notify("Use a JPG, PNG, or WEBP photo.");
        return;
      }
      if (file.size > 12_000_000) {
        notify("That file is over 12 MB. Choose a smaller photo.");
        return;
      }
      const imageDataUrl = await fileToDataUrl(file);
      setProject((current) => ({
        ...current,
        imageDataUrl,
        imageLabel: file.name,
        analyzed: false,
      }));
      notify("Photo added to your project.");
    },
    [notify],
  );

  const setImageFromUrl = useCallback(
    async (url: string, label: string) => {
      const imageDataUrl = await urlToDataUrl(url);
      setProject((current) => ({
        ...current,
        imageDataUrl,
        imageLabel: label,
        analyzed: false,
      }));
      notify(`${label} added.`);
    },
    [notify],
  );

  const clearImage = useCallback(() => {
    setProject((current) => ({ ...current, imageDataUrl: null, imageLabel: null, analyzed: false }));
  }, []);

  const setRoom = useCallback((roomId: RoomId) => {
    setProject((current) => ({ ...current, roomId }));
  }, []);

  const setBudget = useCallback((budgetId: BudgetId) => {
    setProject((current) => ({ ...current, budgetId }));
  }, []);

  const toggleStyle = useCallback((styleId: StyleId) => {
    setProject((current) => ({
      ...current,
      styles: current.styles.includes(styleId)
        ? current.styles.filter((item) => item !== styleId)
        : [...current.styles, styleId],
    }));
  }, []);

  const toggleGoal = useCallback((goalId: GoalId) => {
    setProject((current) => ({
      ...current,
      goals: current.goals.includes(goalId)
        ? current.goals.filter((item) => item !== goalId)
        : [...current.goals, goalId],
    }));
  }, []);

  const setStep = useCallback((step: number) => {
    setProject((current) => ({ ...current, step: Math.min(4, Math.max(0, step)) }));
  }, []);

  const selectDesign = useCallback(
    (id: string, name: string) => {
      setProject((current) => ({ ...current, selectedDesignId: id }));
      notify(`${name} is now your selected design.`);
    },
    [notify],
  );

  const addMaterial = useCallback(
    (id: string) => {
      const material = materialById(id);
      if (!material) return;
      if (project.materials.some((item) => item.id === id)) {
        notify(`${material.name} is already in the estimate.`);
        return;
      }
      setProject((current) => {
        if (current.materials.some((item) => item.id === id)) return current;
        return {
          ...current,
          materials: [
            ...current.materials,
            { id, quantity: suggestedQuantity(material, current.roomSize), custom: false },
          ],
        };
      });
      notify(`${material.name} added to the estimate.`);
    },
    [notify, project.materials],
  );

  const removeMaterial = useCallback(
    (id: string) => {
      const material = materialById(id);
      setProject((current) => ({
        ...current,
        materials: current.materials.filter((item) => item.id !== id),
      }));
      notify(`${material?.name ?? "Material"} removed.`);
    },
    [notify],
  );

  const setQuantity = useCallback((id: string, quantity: number) => {
    const next = Math.min(5000, Math.max(1, Math.round(quantity)));
    setProject((current) => ({
      ...current,
      materials: current.materials.map((item) =>
        item.id === id ? { ...item, quantity: next, custom: true } : item,
      ),
    }));
  }, []);

  const useSuggestedQuantity = useCallback((id: string) => {
    setProject((current) => {
      const material = materialById(id);
      if (!material) return current;
      return {
        ...current,
        materials: current.materials.map((item) =>
          item.id === id
            ? { ...item, quantity: suggestedQuantity(material, current.roomSize), custom: false }
            : item,
        ),
      };
    });
  }, []);

  const setRoomSize = useCallback((size: number) => {
    const roomSize = Math.min(800, Math.max(40, Math.round(size)));
    setProject((current) => ({
      ...current,
      roomSize,
      materials: current.materials.map((item) => {
        if (item.custom) return item;
        const material = materialById(item.id);
        if (!material || material.scale === "each") return item;
        return { ...item, quantity: suggestedQuantity(material, roomSize) };
      }),
    }));
  }, []);

  const markAnalyzed = useCallback(() => {
    setProject((current) => (current.analyzed ? current : { ...current, analyzed: true }));
  }, []);

  const toggleDiy = useCallback(
    (id: string, title: string) => {
      const next = !project.diy[id];
      setProject((current) => ({ ...current, diy: { ...current.diy, [id]: next } }));
      if (next) notify(`${title} marked complete.`);
    },
    [notify, project.diy],
  );

  const resetDemo = useCallback(() => {
    const fresh = defaultProject();
    setProject(fresh);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    notify("Demo reset. Your saved project has been cleared.");
  }, [notify]);

  const value = useMemo(
    () => ({
      project,
      toasts,
      dismissToast,
      notify,
      setImageFromFile,
      setImageFromUrl,
      clearImage,
      setRoom,
      setBudget,
      toggleStyle,
      toggleGoal,
      setStep,
      selectDesign,
      addMaterial,
      removeMaterial,
      setQuantity,
      useSuggestedQuantity,
      setRoomSize,
      markAnalyzed,
      toggleDiy,
      resetDemo,
    }),
    [
      project,
      toasts,
      dismissToast,
      notify,
      setImageFromFile,
      setImageFromUrl,
      clearImage,
      setRoom,
      setBudget,
      toggleStyle,
      toggleGoal,
      setStep,
      selectDesign,
      addMaterial,
      removeMaterial,
      setQuantity,
      useSuggestedQuantity,
      setRoomSize,
      markAnalyzed,
      toggleDiy,
      resetDemo,
    ],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject(): ProjectContextValue {
  const value = useContext(ProjectContext);
  if (!value) throw new Error("useProject must be used within ProjectProvider");
  return value;
}
