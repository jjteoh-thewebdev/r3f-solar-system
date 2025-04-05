# Setting up for the project

## Step 1: Create a new Next.js project

```bash
npx create-next-app r3f-solar-system
cd r3f-solar-system
```

When prompted, select the following options:

- Would you like to use TypeScript? → Yes
- Would you like to use ESLint? → Yes
- Would you like to use Tailwind CSS? → Yes
- Would you like to use `src/` directory? → No (or Yes, your preference)
- Would you like to use App Router? → Yes
- Would you like to customize the default import alias? → No (or Yes if you prefer)
- Would you like to use TurboRepo? → Yes (or No, your preference)

## Step 2: Install 3D libraries

*you can use npm/yarn as well, your preference

```bash
pnpm install three @react-three/fiber @react-three/drei
pnpm install @types/three --save-dev
```

### Step 3: Install ui components

we use [shadcn](https://ui.shadcn.com/) for common ui components(design is not our main objective in this project)

```bash
npx shadcn@latest init
```

When prompted which theme to select, pick any of your choice, I'm using Slate for this project.

Then install button and card components which we will use later.

```bash
npx shadcn@latest add button card
```

Step 5: Download planet textures

We will need images of planets later, you can get this resources from [Solar System Scope](https://www.solarsystemscope.com/textures/) or [NASA](https://nasa3d.arc.nasa.gov/images). Save the resources in `public/textures`

(Optional) Up till this point, test whether your app can spin up successfully by running:

```bash
pnpm run dev
```

Step 6: Gather planet information

We need planet information for display. You can get this information from [NASA](https://science.nasa.gov/solar-system/planets/). I have compiled into `lib/planet-data.ts`.

Download music for autoplaying at background. I got mine from:
Music by <a href="https://pixabay.com/users/clavier-music-16027823/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=310690">Clavier Clavier</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=310690">Pixabay</a>

Find YouTube videos that talk about planets. Found [Crash Course Astronomy playlist](https://youtube.com/playlist?list=PL8dPuuaLjXtPAJr1ysd5yGIyiSFuh0mIL&si=ExFaILCFQHtn4JZv)
