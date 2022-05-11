import { MACHINE_LENGTH } from "../music";

export default function ColumnLabels() {
  return (
    <div className="row column-labels">
      <div className="inner">
        <div className="note-name"></div>
        {[...Array(MACHINE_LENGTH)].map((v, i) => {
          return <div className="cell" key={i}>{i + 1}</div>;
        })}
      </div>
    </div>
  );
}
