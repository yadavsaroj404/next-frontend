import classNames from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={classNames.container}>
      <div className={classNames.loader}>
        <div className={classNames.mask}></div>
        <div className={classNames.mask2}></div>
      </div>
    </div>
  );
}
