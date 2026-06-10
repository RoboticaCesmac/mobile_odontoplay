import { AppMainContainer } from "@/themes/components";
import GameProgressList from "./_list";

export const metadata = {
  title: "Progresso dos jogos",
};

export default function JogosPage() {
  return (
    <AppMainContainer
      title="Progresso dos jogos"
      eyebrow="Acompanhamento infantil"
      description="Veja a evolução de cada criança nos jogos do OdontoPlay."
    >
      <GameProgressList />
    </AppMainContainer>
  );
}
