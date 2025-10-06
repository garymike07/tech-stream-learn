import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import CategoryCourses from "./pages/CategoryCourses";
import CourseDetail from "./pages/CourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Exercises from "./pages/Exercises";
import ExerciseDetail from "./pages/ExerciseDetail";
import Subscribe from "./pages/Subscribe";
import NotFound from "./pages/NotFound";
import { useAuth } from "@/context/AuthContext";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();
  const target = `${location.pathname}${location.search}${location.hash}`;

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          intended: target || "/",
          from: target || "/",
        }}
      />
    );
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/categories"
            element={(
              <RequireAuth>
                <Categories />
              </RequireAuth>
            )}
          />
          <Route
            path="/category/:categoryId"
            element={(
              <RequireAuth>
                <CategoryCourses />
              </RequireAuth>
            )}
          />
          <Route
            path="/course/:courseId"
            element={(
              <RequireAuth>
                <CourseDetail />
              </RequireAuth>
            )}
          />
          <Route
            path="/course/:courseId/lesson/:lessonId"
            element={(
              <RequireAuth>
                <LessonPlayer />
              </RequireAuth>
            )}
          />
          <Route
            path="/exercises"
            element={(
              <RequireAuth>
                <Exercises />
              </RequireAuth>
            )}
          />
          <Route
            path="/exercise/:courseId/:exerciseId"
            element={(
              <RequireAuth>
                <ExerciseDetail />
              </RequireAuth>
            )}
          />
          <Route
            path="/subscribe"
            element={(
              <RequireAuth>
                <Subscribe />
              </RequireAuth>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
