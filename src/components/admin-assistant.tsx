"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function AdminAssistant() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const { toast } = useToast();

  const SpeechRecognition = (typeof window !== 'undefined' && ((window as any).SpeechRecognition || window.webkitSpeechRecognition)) || null;
  let recognizer: any = null;

  useEffect(() => {
    if (!SpeechRecognition) return;
    recognizer = new SpeechRecognition();
    recognizer.continuous = false;
    recognizer.interimResults = false;
    recognizer.lang = 'en-US';

    recognizer.onresult = (evt: any) => {
      const txt = evt.results[0][0].transcript;
      setTranscript(txt);
      runCommand(txt);
    };

    recognizer.onend = () => setListening(false);

    return () => {
      try {
        recognizer && recognizer.stop();
      } catch (e) {}
    };
  }, []);

  const startListening = () => {
    if (!SpeechRecognition) {
      toast({ title: 'Not supported', description: 'Speech recognition not supported in this browser.' });
      return;
    }
    setTranscript('');
    setListening(true);
    const R = new (SpeechRecognition as any)();
    R.continuous = false;
    R.interimResults = false;
    R.lang = 'en-US';
    R.onresult = (evt: any) => {
      const txt = evt.results[0][0].transcript;
      setTranscript(txt);
      runCommand(txt);
    };
    R.onend = () => setListening(false);
    R.start();
  };

  const runCommand = async (txt: string) => {
    const t = txt.trim().toLowerCase();
    setLog((l) => [`> ${txt}`, ...l].slice(0, 20));

    // Add skill: "add skill React 80 technical"
    let m = t.match(/^add skill (.+?) (\d{1,3}) ?(.*)$/i);
    if (m) {
      const name = m[1].trim();
      const proficiency = Math.min(100, Math.max(1, parseInt(m[2])));
      const category = m[3] && m[3].trim() ? m[3].trim() : 'Technical';
      try {
        const { data, error } = await supabase.from('skills').insert({ name, proficiency, category, order_index: 9999 });
        if (error) throw error;
        toast({ title: 'Skill added', description: `${name} (${proficiency}%)` });
        setLog((l) => [`Added skill ${name}`, ...l].slice(0, 20));
        return;
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'Failed to add skill' });
        return;
      }
    }

    // Delete skill: "delete skill 5"
    m = t.match(/^delete skill (\d+)$/i);
    if (m) {
      const id = parseInt(m[1], 10);
      try {
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (error) throw error;
        toast({ title: 'Skill deleted', description: `id ${id}` });
        setLog((l) => [`Deleted skill ${id}`, ...l].slice(0, 20));
        return;
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'Failed to delete' });
        return;
      }
    }

    // Update skill: "update skill 5 name ReactJS" or "update skill 5 85"
    m = t.match(/^update skill (\d+) (.+)$/i);
    if (m) {
      const id = parseInt(m[1], 10);
      const rest = m[2].trim();
      // if rest is number -> update proficiency
      const num = rest.match(/^(\d{1,3})$/);
      try {
        if (num) {
          const prof = Math.min(100, Math.max(1, parseInt(num[1])));
          const { error } = await supabase.from('skills').update({ proficiency: prof }).eq('id', id);
          if (error) throw error;
          toast({ title: 'Skill updated', description: `id ${id} -> ${prof}%` });
          setLog((l) => [`Updated skill ${id} proficiency ${prof}`, ...l].slice(0, 20));
          return;
        } else {
          // update name
          const { error } = await supabase.from('skills').update({ name: rest }).eq('id', id);
          if (error) throw error;
          toast({ title: 'Skill updated', description: `id ${id} -> ${rest}` });
          setLog((l) => [`Updated skill ${id} name ${rest}`, ...l].slice(0, 20));
          return;
        }
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'Failed to update' });
        return;
      }
    }

    if (t === 'list skills' || t === 'show skills') {
      try {
        const { data, error } = await supabase.from('skills').select('*').order('order_index', { ascending: true });
        if (error) throw error;
        const lines = (data || []).map((s: any) => `${s.id}: ${s.name} (${s.proficiency}%)`);
        setLog((l) => [...lines, ...l].slice(0, 20));
        toast({ title: 'Skills fetched', description: `${lines.length} items` });
        return;
      } catch (err: any) {
        toast({ title: 'Error', description: err?.message || 'Failed to fetch' });
        return;
      }
    }

    toast({ title: 'Unknown command', description: txt });
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse" />
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg shadow-cyan-900/50 border border-white/20 flex items-center justify-center transform hover:scale-105 transition-transform"
          aria-label="Open assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v2m6 2-1.5 1.5M4.5 6 6 4.5M20 12h2M2 12H0m3.5 6L4 20.5M20.5 18 19 19.5M12 22v-2" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative w-full max-w-xl bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-cyan-900/40 backdrop-blur-xl border border-white/15 rounded-2xl p-6 text-white shadow-2xl shadow-purple-900/30 transform transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-100 to-purple-100 bg-clip-text text-transparent">Jarvis — Admin Assistant</h3>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => { setTranscript(''); setLog([]); }}>Clear</Button>
                <Button size="sm" onClick={() => setOpen(false)}>Close</Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Say: add skill React 80 Technical"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <Button onClick={() => runCommand(transcript)} className="bg-green-600 hover:bg-green-500">Run</Button>
                <Button onClick={startListening} className={`bg-red-600 hover:bg-red-500 ${listening ? 'animate-pulse' : ''}`}>{listening ? 'Listening...' : 'Voice'}</Button>
              </div>

              <div className="h-44 overflow-y-auto bg-black/20 rounded p-3 text-sm">
                {log.length === 0 ? <div className="text-muted-foreground">No activity yet.</div> : (
                  <ul className="space-y-1">
                    {log.map((l, i) => <li key={i}>{l}</li>)}
                  </ul>
                )}
              </div>

              <div className="text-xs text-muted-foreground">Commands: "add skill NAME LEVEL CATEGORY", "update skill ID NAME|LEVEL", "delete skill ID", "list skills"</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
