import { FC, ReactNode, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  clickLogic: (isCheck: boolean) => void;
};

const PrefCheckBox: FC<Props> = ({
  children,
  className,
  clickLogic,
  ...props
}) => {
  const [checkValue, setCheckValue] = useState(false);
  const onClick = (e: any) => {
    setCheckValue((preCheckValue) => !preCheckValue);
    clickLogic(!checkValue);
  };

  return (
    <>
      <button onClick={(e) => onClick(e)}>
        <input type="checkbox" className="check-input" checked={checkValue} />
        {children}
      </button>

      <style jsx>{`
        button {
          padding: 10;
          background-color: blue;
          border-radius: 30px;
          width: 120px;
          height: 45px;
          color: white;
          font-size: 15px;
        }
        input {
          margin-right: 20px;
        }
        // .ch input[type="checkbox"]:checked::after {
        //   border-color: blue;
        //   background-color: blue;
        // }
      `}</style>
    </>
  );
};

export default PrefCheckBox;
