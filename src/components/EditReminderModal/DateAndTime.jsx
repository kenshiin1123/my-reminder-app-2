import Section from "./Section";
import Input from "./Input";
import Label from "./Label";

export default function DateAndTime({ datetime }) {
  const date = datetime.split("T")[0];
  const time = datetime.split("T")[1];

  return (
    <div className="flex justify-around">
      <Section>
        <Label htmlFor={"time"} text={"Time"} />
        <Input id={"time"} name="time" type="time" defaultValue={time} />
      </Section>
      <Section>
        <Label htmlFor={"Date"} text={"Date"} />
        <Input id={"Date"} name="date" type="date" defaultValue={date} />
      </Section>
    </div>
  );
}
