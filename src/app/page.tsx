import ProblemCreateForm from "@/components/problems/problem-create-form";

export default function Home() {

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h2 className="text-xl m-2">Popular Solutions</h2>
      </div>
      <div>
        <ProblemCreateForm />
      </div>
    </div>
  );
}
