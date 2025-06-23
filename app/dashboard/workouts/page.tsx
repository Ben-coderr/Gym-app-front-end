"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Clock,
  Target,
  Dumbbell,
  TrendingUp,
  Users,
  PlayCircle,
  Copy,
  History,
  Eye,
  Save,
  RotateCcw
} from "lucide-react";
import { motion } from "framer-motion";
import { format, startOfWeek, addDays, addWeeks, subWeeks } from "date-fns";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  duration?: string;
  restTime: string;
  notes?: string;
  muscleGroup: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
  totalDuration: number;
  focus: string;
}

interface WeeklyProgram {
  id: string;
  name: string;
  weekStartDate: Date;
  weekEndDate: Date;
  workouts: WorkoutDay[];
  status: "active" | "draft" | "archived";
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  targetAudience: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const muscleGroups = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Cardio", "Full Body"];
const difficulties = ["beginner", "intermediate", "advanced"];

export default function WorkoutsPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [programs, setPrograms] = useState<WeeklyProgram[]>([
    {
      id: "1",
      name: "Strength Building Program",
      weekStartDate: startOfWeek(new Date()),
      weekEndDate: addDays(startOfWeek(new Date()), 6),
      status: "active",
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-01-15"),
      description: "Focus on building overall strength with compound movements",
      targetAudience: "Intermediate lifters",
      difficulty: "intermediate",
      workouts: [
        {
          day: "Monday",
          focus: "Chest & Triceps",
          totalDuration: 75,
          exercises: [
            {
              id: "1",
              name: "Bench Press",
              sets: 4,
              reps: "8-10",
              weight: "80-90% 1RM",
              restTime: "2-3 min",
              muscleGroup: "Chest",
              difficulty: "intermediate",
              notes: "Focus on controlled movement"
            },
            {
              id: "2",
              name: "Incline Dumbbell Press",
              sets: 3,
              reps: "10-12",
              weight: "70-80% 1RM",
              restTime: "90 sec",
              muscleGroup: "Chest",
              difficulty: "intermediate"
            },
            {
              id: "3",
              name: "Tricep Dips",
              sets: 3,
              reps: "12-15",
              restTime: "60 sec",
              muscleGroup: "Arms",
              difficulty: "beginner"
            }
          ]
        },
        {
          day: "Tuesday",
          focus: "Back & Biceps",
          totalDuration: 80,
          exercises: [
            {
              id: "4",
              name: "Deadlifts",
              sets: 4,
              reps: "6-8",
              weight: "85-95% 1RM",
              restTime: "3-4 min",
              muscleGroup: "Back",
              difficulty: "advanced",
              notes: "Maintain proper form throughout"
            },
            {
              id: "5",
              name: "Pull-ups",
              sets: 3,
              reps: "8-12",
              restTime: "2 min",
              muscleGroup: "Back",
              difficulty: "intermediate"
            }
          ]
        },
        {
          day: "Wednesday",
          focus: "Rest Day",
          totalDuration: 30,
          exercises: [
            {
              id: "6",
              name: "Light Cardio",
              sets: 1,
              reps: "1",
              duration: "20-30 min",
              restTime: "N/A",
              muscleGroup: "Cardio",
              difficulty: "beginner",
              notes: "Low intensity recovery"
            }
          ]
        }
      ]
    }
  ]);

  const [selectedProgram, setSelectedProgram] = useState<WeeklyProgram | null>(null);
  const [editingProgram, setEditingProgram] = useState<WeeklyProgram | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    targetAudience: "",
    difficulty: "beginner" as const,
  });

  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: 3,
    reps: "",
    weight: "",
    duration: "",
    restTime: "",
    notes: "",
    muscleGroup: "",
    difficulty: "beginner" as const,
  });

  const getCurrentWeekProgram = () => {
    return programs.find(p => 
      p.status === "active" && 
      format(p.weekStartDate, 'yyyy-MM-dd') === format(startOfWeek(currentWeek), 'yyyy-MM-dd')
    );
  };

  const handleCreateProgram = () => {
    const weekStart = startOfWeek(currentWeek);
    const weekEnd = addDays(weekStart, 6);
    
    const program: WeeklyProgram = {
      id: (programs.length + 1).toString(),
      name: newProgram.name,
      description: newProgram.description,
      targetAudience: newProgram.targetAudience,
      difficulty: newProgram.difficulty,
      weekStartDate: weekStart,
      weekEndDate: weekEnd,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      workouts: daysOfWeek.map(day => ({
        day,
        focus: "",
        totalDuration: 0,
        exercises: []
      }))
    };
    
    setPrograms([...programs, program]);
    setSelectedProgram(program);
    setIsCreateDialogOpen(false);
    setNewProgram({ name: "", description: "", targetAudience: "", difficulty: "beginner" });
  };

  const handleAddExercise = () => {
    if (!selectedProgram || !selectedDay) return;
    
    const exercise: Exercise = {
      id: Date.now().toString(),
      name: newExercise.name,
      sets: newExercise.sets,
      reps: newExercise.reps,
      weight: newExercise.weight,
      duration: newExercise.duration,
      restTime: newExercise.restTime,
      notes: newExercise.notes,
      muscleGroup: newExercise.muscleGroup,
      difficulty: newExercise.difficulty,
    };

    const updatedProgram = {
      ...selectedProgram,
      workouts: selectedProgram.workouts.map(workout => 
        workout.day === selectedDay 
          ? { ...workout, exercises: [...workout.exercises, exercise] }
          : workout
      ),
      updatedAt: new Date()
    };

    setPrograms(programs.map(p => p.id === selectedProgram.id ? updatedProgram : p));
    setSelectedProgram(updatedProgram);
    setIsExerciseDialogOpen(false);
    setNewExercise({
      name: "",
      sets: 3,
      reps: "",
      weight: "",
      duration: "",
      restTime: "",
      notes: "",
      muscleGroup: "",
      difficulty: "beginner",
    });
  };

  const handleDeleteExercise = (dayName: string, exerciseId: string) => {
    if (!selectedProgram) return;
    
    const updatedProgram = {
      ...selectedProgram,
      workouts: selectedProgram.workouts.map(workout => 
        workout.day === dayName 
          ? { ...workout, exercises: workout.exercises.filter(ex => ex.id !== exerciseId) }
          : workout
      ),
      updatedAt: new Date()
    };

    setPrograms(programs.map(p => p.id === selectedProgram.id ? updatedProgram : p));
    setSelectedProgram(updatedProgram);
  };

  const handlePublishProgram = (programId: string) => {
    setPrograms(programs.map(p => 
      p.id === programId 
        ? { ...p, status: "active" as const, updatedAt: new Date() }
        : { ...p, status: p.status === "active" ? "archived" as const : p.status }
    ));
  };

  const handleCopyProgram = (program: WeeklyProgram) => {
    const weekStart = startOfWeek(currentWeek);
    const weekEnd = addDays(weekStart, 6);
    
    const copiedProgram: WeeklyProgram = {
      ...program,
      id: Date.now().toString(),
      name: `${program.name} (Copy)`,
      weekStartDate: weekStart,
      weekEndDate: weekEnd,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setPrograms([...programs, copiedProgram]);
    setSelectedProgram(copiedProgram);
  };

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentWeekProgram = getCurrentWeekProgram();
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === "active").length;
  const draftPrograms = programs.filter(p => p.status === "draft").length;
  const archivedPrograms = programs.filter(p => p.status === "archived").length;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return <Badge variant="outline" className="text-green-600">Beginner</Badge>;
      case "intermediate":
        return <Badge variant="secondary">Intermediate</Badge>;
      case "advanced":
        return <Badge variant="destructive">Advanced</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "archived":
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workout Programs</h1>
          <p className="text-muted-foreground">Create and manage weekly workout programs for your members</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Workout Program</DialogTitle>
                <DialogDescription>
                  Create a new weekly workout program for the selected week.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="programName">Program Name</Label>
                  <Input
                    id="programName"
                    value={newProgram.name}
                    onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                    placeholder="Strength Building Program"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                    placeholder="Program description and goals..."
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={newProgram.targetAudience}
                    onChange={(e) => setNewProgram({ ...newProgram, targetAudience: e.target.value })}
                    placeholder="Intermediate lifters, Beginners, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={newProgram.difficulty} onValueChange={(value: any) => setNewProgram({ ...newProgram, difficulty: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((diff) => (
                        <SelectItem key={diff} value={diff}>
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-muted-foreground">
                  Week: {format(startOfWeek(currentWeek), 'MMM d')} - {format(addDays(startOfWeek(currentWeek), 6), 'MMM d, yyyy')}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProgram} disabled={!newProgram.name}>
                  Create Program
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Programs</p>
                  <h3 className="text-2xl font-bold">{totalPrograms}</h3>
                </div>
                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Programs</p>
                  <h3 className="text-2xl font-bold">{activePrograms}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                  <PlayCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Draft Programs</p>
                  <h3 className="text-2xl font-bold">{draftPrograms}</h3>
                </div>
                <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
                  <Edit className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Archived Programs</p>
                  <h3 className="text-2xl font-bold">{archivedPrograms}</h3>
                </div>
                <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-900">
                  <History className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Week</TabsTrigger>
          <TabsTrigger value="history">Program History</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="space-y-6">
            {/* Week Navigation */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Week Navigation</CardTitle>
                    <CardDescription>
                      {format(startOfWeek(currentWeek), 'MMMM d')} - {format(addDays(startOfWeek(currentWeek), 6), 'MMMM d, yyyy')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                    >
                      Previous Week
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentWeek(new Date())}
                    >
                      This Week
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                    >
                      Next Week
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Current Week Program */}
            {selectedProgram || currentWeekProgram ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {(selectedProgram || currentWeekProgram)?.name}
                        {getStatusBadge((selectedProgram || currentWeekProgram)?.status || "")}
                        {getDifficultyBadge((selectedProgram || currentWeekProgram)?.difficulty || "")}
                      </CardTitle>
                      <CardDescription>
                        {(selectedProgram || currentWeekProgram)?.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {(selectedProgram || currentWeekProgram)?.status === "draft" && (
                        <Button 
                          onClick={() => handlePublishProgram((selectedProgram || currentWeekProgram)?.id || "")}
                          className="gap-2"
                        >
                          <Save className="h-4 w-4" />
                          Publish
                        </Button>
                      )}
                      <Button 
                        variant="outline"
                        onClick={() => handleCopyProgram(selectedProgram || currentWeekProgram!)}
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {daysOfWeek.map((day) => {
                      const dayWorkout = (selectedProgram || currentWeekProgram)?.workouts.find(w => w.day === day);
                      
                      return (
                        <Card key={day} className="border-l-4 border-l-primary/20">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg">{day}</CardTitle>
                                {dayWorkout?.focus && (
                                  <CardDescription>{dayWorkout.focus}</CardDescription>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {dayWorkout?.totalDuration && (
                                  <Badge variant="outline" className="gap-1">
                                    <Clock className="h-3 w-3" />
                                    {dayWorkout.totalDuration} min
                                  </Badge>
                                )}
                                <Dialog open={isExerciseDialogOpen && selectedDay === day} onOpenChange={(open) => {
                                  setIsExerciseDialogOpen(open);
                                  if (open) setSelectedDay(day);
                                }}>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="gap-2">
                                      <Plus className="h-4 w-4" />
                                      Add Exercise
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Add Exercise to {day}</DialogTitle>
                                      <DialogDescription>
                                        Add a new exercise to the {day} workout.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="exerciseName">Exercise Name</Label>
                                          <Input
                                            id="exerciseName"
                                            value={newExercise.name}
                                            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                                            placeholder="Bench Press"
                                          />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="muscleGroup">Muscle Group</Label>
                                          <Select value={newExercise.muscleGroup} onValueChange={(value) => setNewExercise({ ...newExercise, muscleGroup: value })}>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select muscle group" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {muscleGroups.map((group) => (
                                                <SelectItem key={group} value={group}>
                                                  {group}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="sets">Sets</Label>
                                          <Input
                                            id="sets"
                                            type="number"
                                            value={newExercise.sets}
                                            onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) })}
                                          />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="reps">Reps</Label>
                                          <Input
                                            id="reps"
                                            value={newExercise.reps}
                                            onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                                            placeholder="8-10"
                                          />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="restTime">Rest Time</Label>
                                          <Input
                                            id="restTime"
                                            value={newExercise.restTime}
                                            onChange={(e) => setNewExercise({ ...newExercise, restTime: e.target.value })}
                                            placeholder="2-3 min"
                                          />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="weight">Weight/Intensity</Label>
                                          <Input
                                            id="weight"
                                            value={newExercise.weight}
                                            onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                                            placeholder="80-90% 1RM"
                                          />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="duration">Duration (optional)</Label>
                                          <Input
                                            id="duration"
                                            value={newExercise.duration}
                                            onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                                            placeholder="30 seconds"
                                          />
                                        </div>
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="difficulty">Difficulty</Label>
                                        <Select value={newExercise.difficulty} onValueChange={(value: any) => setNewExercise({ ...newExercise, difficulty: value })}>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {difficulties.map((diff) => (
                                              <SelectItem key={diff} value={diff}>
                                                {diff.charAt(0).toUpperCase() + diff.slice(1)}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="notes">Notes (optional)</Label>
                                        <Textarea
                                          id="notes"
                                          value={newExercise.notes}
                                          onChange={(e) => setNewExercise({ ...newExercise, notes: e.target.value })}
                                          placeholder="Focus on controlled movement..."
                                          rows={2}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-end gap-3">
                                      <Button variant="outline" onClick={() => setIsExerciseDialogOpen(false)}>
                                        Cancel
                                      </Button>
                                      <Button onClick={handleAddExercise} disabled={!newExercise.name || !newExercise.muscleGroup}>
                                        Add Exercise
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {dayWorkout?.exercises.length ? (
                              <div className="space-y-3">
                                {dayWorkout.exercises.map((exercise, index) => (
                                  <div key={exercise.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium">{index + 1}. {exercise.name}</span>
                                        <Badge variant="outline" className="text-xs">
                                          {exercise.muscleGroup}
                                        </Badge>
                                        {getDifficultyBadge(exercise.difficulty)}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {exercise.sets} sets × {exercise.reps} reps
                                        {exercise.weight && ` @ ${exercise.weight}`}
                                        {exercise.duration && ` for ${exercise.duration}`}
                                        • Rest: {exercise.restTime}
                                      </div>
                                      {exercise.notes && (
                                        <div className="text-xs text-muted-foreground mt-1">
                                          Note: {exercise.notes}
                                        </div>
                                      )}
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="gap-2">
                                          <Edit className="h-4 w-4" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          className="gap-2 text-destructive"
                                          onClick={() => handleDeleteExercise(day, exercise.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                <Dumbbell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>No exercises added yet</p>
                                <p className="text-sm">Click "Add Exercise" to get started</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Program for This Week</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a new workout program for the week of {format(startOfWeek(currentWeek), 'MMM d')} - {format(addDays(startOfWeek(currentWeek), 6), 'MMM d, yyyy')}
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Program
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Program History</CardTitle>
              <CardDescription>
                View and manage all workout programs across different weeks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search programs..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">Export</Button>
                  <Button variant="outline">Filter</Button>
                </div>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program Name</TableHead>
                      <TableHead>Week Period</TableHead>
                      <TableHead>Target Audience</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{program.name}</div>
                            {program.description && (
                              <div className="text-sm text-muted-foreground truncate max-w-48">
                                {program.description}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(program.weekStartDate, 'MMM d')} - {format(program.weekEndDate, 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>{program.targetAudience}</TableCell>
                        <TableCell>{getDifficultyBadge(program.difficulty)}</TableCell>
                        <TableCell>{getStatusBadge(program.status)}</TableCell>
                        <TableCell>{format(program.updatedAt, 'MMM d, yyyy')}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="gap-2"
                                onClick={() => setSelectedProgram(program)}
                              >
                                <Eye className="h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="gap-2"
                                onClick={() => handleCopyProgram(program)}
                              >
                                <Copy className="h-4 w-4" />
                                Copy Program
                              </DropdownMenuItem>
                              {program.status === "draft" && (
                                <DropdownMenuItem 
                                  className="gap-2"
                                  onClick={() => handlePublishProgram(program.id)}
                                >
                                  <Save className="h-4 w-4" />
                                  Publish
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 text-destructive">
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}