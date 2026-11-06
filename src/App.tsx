import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProgressProvider } from "@/hooks/useProgress";
import { HomePage } from "@/pages/HomePage";
import { LessonPage } from "@/pages/LessonPage";
import { PathPage } from "@/pages/PathPage";
import { PracticePage } from "@/pages/PracticePage";
import { LibraryPage } from "@/pages/LibraryPage";
import { CoordinateTrainerPage } from "@/pages/CoordinateTrainerPage";

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="path" element={<PathPage />} />
            <Route path="try" element={<PracticePage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="coordinates" element={<CoordinateTrainerPage />} />
            <Route path="learn/:stageId/:lessonId" element={<LessonPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
