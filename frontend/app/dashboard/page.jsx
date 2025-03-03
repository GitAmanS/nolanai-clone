"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  LayoutDashboard, 
  FileText, 
  Settings,
  Loader2,
  Plus,
  Trash2,
  Copy,
  Eye,
  ChevronDown,
  LogOutIcon
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { red } from "@mui/material/colors";
import { redirect } from "next/navigation";

const Sidebar = ({ active, setActive }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    redirect("/login");
  };
  return (
  <div className="w-64 border-r h-screen p-4 fixed bg-muted/40">
    <h2 className="text-xl font-bold mb-6 px-2">Script Generator</h2>
    <nav className="space-y-1">
      {[
        { name: "Overview", icon: <LayoutDashboard className="w-4 h-4" />, id: "overview" },
        { name: "Scripts", icon: <FileText className="w-4 h-4" />, id: "scripts" },
        { name: "Settings", icon: <Settings className="w-4 h-4" />, id: "settings" },
        { name: "Logout", icon: <LogOutIcon className="w-4 h-4" />, id: "logout" }
      ].map((item) => (

        item.id === "logout" ? (
          <Button
            key={item.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            {item.icon}
            <span className="ml-2">{item.name}</span>
          </Button>
        ) :
        <Button
          key={item.id}
          variant={active === item.id ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActive(item.id)}
        >
          {item.icon}
          <span className="ml-2">{item.name}</span>
        </Button>
      ))}
    </nav>
  </div>
);}

const Dashboard = () => {
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState("overview");
  const [selectedScript, setSelectedScript] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [scriptToDelete, setScriptToDelete] = useState(null);

  const fetchScripts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/scripts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch scripts");
      const data = await response.json();
      setScripts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScripts();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setGenerating(true);
      setError("");
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/scripts/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) throw new Error("Generation failed");
      await fetchScripts();
      setPrompt("");
    } catch (error) {
      setError(error.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteScript = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/scripts/${scriptToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error("Delete failed");
      await fetchScripts();
      setDeleteConfirmOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  const ScriptAccordionItem = ({ script }) => (
    <AccordionItem value={script._id} className="border rounded-lg mb-2">
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex-1 text-left">
            <h3 className="font-medium truncate max-w-[400px]">{script.prompt}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(script.createdAt).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center space-x-2 mr-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedScript(script);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setScriptToDelete(script);
                setDeleteConfirmOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-2 pb-4">
        <div className="flex flex-col space-y-4">
          <div className="bg-muted/20 rounded-md p-4 relative">
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {script.generatedText}
            </pre>
            <div className="absolute top-2 right-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(script.generatedText)}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground text-xs">
              {script.generatedText.length} characters • 
              {Math.ceil(script.generatedText.split(/\s+/).length)} words
            </span>
            <span className="text-muted-foreground text-xs">
              Created at {new Date(script.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar active={activePage} setActive={setActivePage} />
      
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {activePage === "overview" ? "Dashboard Overview" : "Script Management"}
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}

        {activePage === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Activity Chart Placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activePage === "scripts" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Script</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Script Prompt</Label>
                    <Input
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Enter your script prompt..."
                      required
                    />
                  </div>
                  <Button type="submit" disabled={generating}>
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Generate Script
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Scripts</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
                  </div>
                ) : scripts.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {scripts.map((script) => (
                      <ScriptAccordionItem key={script._id} script={script} />
                    ))}
                  </Accordion>
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    No scripts generated yet
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <Dialog className="" open={!!selectedScript} onOpenChange={() => setSelectedScript(null)}>
          <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <div>
                  Script Preview
                  <span className=" block text-sm mt-1 font-normal">
                    {selectedScript?.prompt}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(selectedScript?.generatedText)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Full Script
                </Button>
              </DialogTitle>
            </DialogHeader>
            {selectedScript && (
              <div className="relative">
                <pre className="whitespace-pre-wrap p-4 bg-slate-100 rounded-md font-mono text-sm leading-relaxed">
                  {selectedScript.generatedText}
                </pre>
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedScript(null)}
                    className="text-muted-foreground"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Are you sure you want to permanently delete this script?
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteScript}
              >
                Delete Permanently
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Dashboard;