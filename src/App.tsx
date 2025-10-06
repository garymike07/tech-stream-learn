import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import RouteLoading from "@/components/RouteLoading";
import { useAuth } from "@/context/AuthContext";

const Index = lazy(() => import("./pages/Index"));
const Categories = lazy(() => import("./pages/Categories"));
const CategoryCourses = lazy(() => import("./pages/CategoryCourses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const LessonPlayer = lazy(() => import("./pages/LessonPlayer"));
const LearningPaths = lazy(() => import("./pages/LearningPaths"));
const Insights = lazy(() => import("./pages/Insights"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Exercises = lazy(() => import("./pages/Exercises"));
const ExerciseDetail = lazy(() => import("./pages/ExerciseDetail"));
const Subscribe = lazy(() => import("./pages/Subscribe"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
        <Suspense fallback={<RouteLoading />}>
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
            path="/paths"
            element={(
              <RequireAuth>
                <LearningPaths />
              </RequireAuth>
            )}
          />
          <Route
            path="/insights"
            element={(
              <RequireAuth>
                <Insights />
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
          <Route path="/login/*" element={<Login />} />
          <Route path="/signup/*" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
