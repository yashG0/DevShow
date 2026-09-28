import { Badge } from "./components/ui/Badge"
import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"
import { Input } from "./components/ui/Input"
import { Textarea } from "./components/ui/Textarea"

function App() {
  return (
    <main className="min-h-screen bg-[var(--background)] p-6 text-[var(--text-primary)]">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="p-6">
          <div className="mb-6">
            <Badge>Design System</Badge>

            <h1 className="mt-4 text-3xl font-semibold">
              DevShow UI
            </h1>

            <p className="mt-2 text-[var(--text-secondary)]">
              Core components for the application.
            </p>
          </div>

          <div className="space-y-5">
            <Input
              label="Project title"
              placeholder="My awesome project"
            />

            <Textarea
              label="Description"
              placeholder="Tell people about your project..."
            />

            <div className="flex flex-wrap gap-3">
              <Button>Save Project</Button>
              <Button variant="secondary">
                Cancel
              </Button>
              <Button variant="ghost">
                Preview
              </Button>
              <Button variant="danger">
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

export default App