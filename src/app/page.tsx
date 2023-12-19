import ProblemCreateForm from "@/components/problems/problem-create-form";
import ProblemsList from "@/components/problems/problems-list";
import { Divider } from "@nextui-org/react";
import { PROBMELMS } from "@/components/problems/problems-list";

export default function Home() {

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h2 className="text-xl m-2">Popular Solutions</h2>
      </div>
      <div className="border shadow py-3 px-2">
        <ProblemCreateForm />
        <Divider className="my-4" />
        <h3 className="text-lg m-2">Top {PROBMELMS} Problems</h3>
        <ProblemsList />
      </div>
    </div>
  );
}
