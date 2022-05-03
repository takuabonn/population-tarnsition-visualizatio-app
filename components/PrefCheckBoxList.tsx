import { FC } from "react";
import PrefCheckBox from "./prefCheckBox";
import { Pref, Population } from "../types";
import { POPULATION_CONSTRUCTION } from "../constant";
import { apiClient } from "../lib/apiClient";
import { useCheckContext } from "../pages/_app";

type Props = {
  prefList: Pref[];
  className?: string;
};

const PrefCheckBoxList: FC<Props> = ({ prefList, ...props }) => {
  const { state, checkOn, checkOff } = useCheckContext();
  console.log(state.checkList);

  const onClick = (prefName: string, prefCode: number) => (
    isCheck: boolean
  ) => {
    const data = async () => {
      const response = await apiClient.get(
        `${POPULATION_CONSTRUCTION}?prefCode=${prefCode}`
      );
      const { data } = await response.data.result;

      const sumPopulation = data.find((value: any) => value.label === "総人口")
        .data;

      return sumPopulation.map((value: Population) => value.value);
    };

    data().then((result) => {
      // 色は完全にランダム。
      const r = Math.round(Math.random() * 255);
      const g = Math.round(Math.random() * 255);
      const b = Math.round(Math.random() * 255);
      const borderColor = `rgb(${r},${g},${b})`;
      if (isCheck) {
        checkOn({
          label: prefName,
          data: result,
          borderColor: borderColor,
          isCheck: isCheck,
          prefCode: prefCode,
        });
      } else {
        checkOff({
          label: prefName,
          data: result,
          borderColor: borderColor,
          isCheck: isCheck,
          prefCode: prefCode,
        });
      }
    });
  };

  return (
    <>
      <div className="wrap">
        {prefList.map((value, index) => (
          <div className="button-box" key={index}>
            <PrefCheckBox
              clickLogic={(isCheck) =>
                onClick(value.prefName, value.prefCode)(isCheck)
              }
            >
              {value.prefName}
            </PrefCheckBox>
          </div>
        ))}
      </div>

      <style jsx>{`
        .button-box {
          margin: 5px;
        }
        .wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default PrefCheckBoxList;
