import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CheckBox from "../components/prefCheckBox";
import { apiClient } from "../lib/apiClient";
import { PREF_API } from "../constant";
import { AxiosResponse } from "axios";
import PrefCheckBoxList from "../components/PrefCheckBoxList";
import { Pref } from "../types";
import PopulationTransitionGraph from "../components/PopulationTransitionGraph";

type Props = {
  prefList: Pref[];
};

const Home: NextPage<Props> = ({ prefList, ...props }) => {
  return (
    <>
      <header>
        <h1>都道府県別人工推移</h1>
      </header>

      <PrefCheckBoxList prefList={prefList} />
      <PopulationTransitionGraph />

      <style jsx>{`
        header {
          background-color: blue;
          color: white;
          margin: 0;
          margin-bottom: 20px;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apiClient.get(PREF_API);
  const prefList: Pref[] = data.result;

  return {
    props: { prefList },
  };
};

export default Home;
