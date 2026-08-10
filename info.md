AOKIGAHARA — Procedural Ambient Pentalogie
Project statement
The design of Aokigahara as a procedural ambient sound system is for the imagination of the forest as a living memory.
The work uses interconnected generative patches to model environmental processes, human traces, memory, ritual and mechanical repetition. Rather than creating a set sequence of songs, it is based on these models.
Musical fragments are stored, aged, mutated and recalled. Rhythms evolve through probabilistic interactions and micro-temporal variations. Human traces become indistinguishable from environmental sounds, while a fictional Kagura Machine continues to reconstruct a ritual even after its original meaning has disappeared.
Influenced by Japanese minimalism, experimental electronic music, procedural composition and the atmosphere of the forests and lakes around Mount Fuji, the system is characterized by its movement across organic ecology and artificial machinery.
Scientific framing
The term scientific is used here as a method of description, not as a claim that the patches are a literal ecological or neurological simulation. The system uses scientific concepts as compositional models:
The system therefore resembles a distributed dynamical model. Each patch has local rules, but the resulting composition is determined by their interaction over time.
initial conditions
      ↓
independent processes
      ↓
probabilistic events
      ↓
state accumulation
      ↓
memory and feedback
      ↓
mutation and repetition
      ↓
ritualisation
      ↓
decay and forgetting
      ↓
residual sound
Compositional principles
Overview
The project is organised as a network of child patches rather than as a linear arrangement. Each patch represents a process or layer of an imagined environment. The patches may operate independently, but they can exchange shared parameters such as activity, memory reliability, event density, instability, spatial movement, and ritual intensity.
Process categories
Category	Function	Audible result
Environmental field	Maintains spatial and spectral continuity	drones, filtered noise, resonance
Ecological processes	Produces activity at different temporal scales	pulses, textures, microscopic events
Memory processes	Stores and recalls previous material	returning fragments and altered motifs
Human-trace processes	Introduces indirect signs of people	distant movement, voices, boats, objects
Rhythmic processes	Generates local temporal behaviour	irregular pulses and ghost events
Ritual processes	Organises repetition into cultural-like patterns	bells, calls, responses, ceremonial gestures
Dissolution process	Reduces the system's capacity for new activity	sparse residue, spectral darkening, silence
Shared-state model
A possible shared state is:
activity                0.0–1.0   current event capacity
memory_reliability      0.0–1.0   probability of successful recall
instability             0.0–1.0   timing and parameter drift
spectral_brightness     0.0–1.0   high-frequency presence
human_presence          0.0–1.0   density of human traces
ritual_intensity        0.0–1.0   degree of patterned repetition
corruption              0.0–1.0   deviation from remembered material
residue                 0.0–1.0   surviving environmental activity
These values are compositional controls, not real measurements.
Event model
A patch can be described as a cycle:
read state
  ↓
calculate probability
  ↓
wait according to local time scale
  ↓
possibly generate an event
  ↓
store, modify, or transmit information
  ↓
update state
For example, an event probability may decrease as dissolution increases:
activity = 1 - dissolution
probability = base_probability × activity
Timing can simultaneously become less certain:
interval = base_interval × (1 + dissolution × instability_factor)
The purpose is not numerical realism. The equations make the intended behaviour explicit and reproducible.
Why this is not simply random
Unconstrained randomness produces unrelated events. AOKIGAHARA uses bounded choices, persistent state, recurrence, decay, and cross-process response. The system therefore has history: its present behaviour is partly determined by what has already occurred.
Temporal ecology
The patches occupy several temporal scales:
This produces a form of temporal ecology in which geological, biological, human, and ritual times coexist without being reduced to a common beat.
Inter-Track Architecture
Five temporal environments
The tracks form a geographic and conceptual system.
Track	Environment	Memory type	Primary time scale	Human presence	Core state
青木ヶ原	Forest	Ecological	Biological	Indirect	Recall
西湖	Lake	Reflective	Fluid	Traces	Reflection
村	Village	Collective	Social	Strong but absent	Forgetting
富士山	Mountain	Geological	Deep time	Minimal	Pressure
神社	Shrine	Ritual	Cyclical	Intentional	Invocation
Shared vocabulary
The tracks may share slow procedural evolution, probabilistic events, memory fragments, spatial movement, long reverberation, sparse bells, resonant percussion, drones, micro-rhythm, and silence. Their meanings must remain different: the same bell can be a distant reflection in Saiko, an abandoned routine in the Village, or an intentional gesture in the Shrine.
Project geography
                         FUJISAN
                       geological time
                             │
                             ▼
AOKIGAHARA ─────────────── SAIKO
 biological time          reflective time
       │                        │
       └──────── VILLAGE ───────┘
                  social time
                       │
                       ▼
                    SHRINE
                  ritual time
The geography is real, but the relationships between sounds are fictional.
Runtime philosophy
The patches are intended to be started and allowed to evolve. They do not need to behave like conventional songs with a predetermined arrangement. A performance may be understood as a transition through changing system conditions:
initialisation → emergence → accumulation → mutation → ritualisation → decay → forgetting → silence
Dissolution model
The stopping patch should not simply lower volume and issue a hard stop. It changes the internal conditions that allow events to occur.
active
  ↓
unstable
  ↓
fragmenting
  ↓
forgetting
  ↓
residue
  ↓
silence
During dissolution:
The forest does not become quiet because an external command silences it. It becomes unable to produce new events.
Shared dissolution interface
Child patches can read a shared dissolution value:
dissolution = 0.0   normal operation
dissolution = 0.5   fragmented activity
dissolution = 0.9   isolated residue
dissolution = 1.0   terminal state
A patch can derive local behaviour from it:
activity = 1 - dissolution
memory_reliability = 1 - dissolution²
instability = dissolution²
These relationships are expressive models. They may be adjusted for musical effect.
Every live loop must eventually call sleep or sync, including branches in which no sound is produced. A residue loop must therefore wait even when its probability test fails. This prevents zero-time loops and allows the stopping system to remain stable during a long performance.
The master fade can be used when the performance workspace is dedicated to AOKIGAHARA. If other pieces are running in the same audio environment, a global mixer fade will affect them as well.
Memory and Mutation Model
Purpose
The memory system replaces the fixed sequencer as the main model for melodic and rhythmic continuity. A conventional sequencer reproduces a prescribed order. A memory process stores traces and decides whether, when, and in what form they return.
Memory representation
A remembered fragment can be represented as a state record:
fragment = {
    pitch,
    duration,
    energy,
    age,
    position,
    timbral_character
}
The exact implementation may vary, but the conceptual requirements are persistence, ageing, and the possibility of altered recall.
Ageing
Ageing changes the likelihood and character of a recall. A simplified model is:
energy(t + 1) = energy(t) × decay_rate
recall_probability = initial_probability × memory_reliability
Older material may become quieter, less frequent, less stable in pitch, or more spatially displaced. A memory does not necessarily disappear immediately; it becomes increasingly uncertain.
Mutation
A recalled fragment can be transformed by controlled variation:
Mutation ensures that recurrence does not equal duplication. The remembered event and the current recollection gradually become different objects.
Memory is not recording
The project treats memory as an active generative process. Each recall can become a new source for later recall, creating a chain:
event → storage → ageing → recall → mutation → re-storage
This creates artificial biography. The system accumulates a past, but that past is continuously rewritten.
Controlled corruption
Corruption is not failure in the technical sense. It is a compositional parameter that produces ambiguity between source and recollection. At higher corruption values, fragments may become incomplete, stretched, displaced, or combined with unrelated material.
The desired result is not noise for its own sake, but the perceptual question: is this an original event, an echo, or a reconstruction?
Dissolution and forgetting
During the stopping phase, memory reliability decreases before the sound disappears completely. New events become rare, recall becomes unreliable, timing drifts, and surviving material is increasingly experienced as residue. The system therefore loses its ability to produce new information before it reaches silence.