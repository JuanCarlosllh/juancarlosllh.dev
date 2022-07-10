import type { NextPage } from "next";
import fs from "fs";
import toml from "toml";

interface HomeProps {
  landing: {
    title: string;
    subtitle: string;
  };
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">{props.landing.title}</h1>
      <p className="text-xl pt-4">{props.landing.subtitle}</p>
    </div>
  );
};

export async function getStaticProps() {
  const file = await fs.promises.readFile(
    `${process.cwd()}/content/landing.toml`
  );
  const parsedFile = toml.parse(file.toString());
  return {
    props: parsedFile,
  };
}

export default Home;
