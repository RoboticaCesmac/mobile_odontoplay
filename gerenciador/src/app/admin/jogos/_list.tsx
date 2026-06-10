"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { GameProgress, RegisteredUser } from "@/data/users";
import UserServices from "@/services/user";
import { AppInput, AppLoader, AppSelect } from "@/themes/components";

const defaultFilter = {
  name: "",
  game: "-1",
};

function formatDateTime(value?: string) {
  if (!value) {
    return "Sem registro";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Fortaleza",
  }).format(date);
}

function getProgressLabel(progress?: GameProgress) {
  if (!progress) {
    return "Não iniciado";
  }

  return progress.concluido ? "Concluído" : "Em andamento";
}

function getProgressClass(progress?: GameProgress) {
  if (!progress) {
    return "bg-slate-100 text-slate-500";
  }

  return progress.concluido
    ? "bg-emerald-100 text-emerald-700"
    : "bg-amber-100 text-amber-700";
}

function StarRating({
  value,
  max,
}: {
  value?: number;
  max: number;
}) {
  const stars = Math.max(0, Math.min(max, Number(value ?? 0)));

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          className={index < stars ? "text-[20px] text-amber-400" : "text-[20px] text-slate-300"}
        >
          {index < stars ? "\u2605" : "\u2606"}
        </span>
      ))}
      <span className="ml-1 text-xs font-bold text-slate-500">
        {stars}/{max}
      </span>
    </div>
  );
}

function GameProgressCell({
  title,
  progress,
  maxStars,
  showInstrumentosVistosOnly = false,
}: {
  title: string;
  progress?: GameProgress;
  maxStars: number;
  showInstrumentosVistosOnly?: boolean;
}) {
  const instrumentosVistos = progress?.instrumentosVistos?.length ?? 0;

  return (
    <div className="min-w-[250px] rounded-[18px] border border-slate-100 bg-slate-50/80 p-4">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{title}</p>
          <div className="mt-2">
            <StarRating value={progress?.estrelas} max={maxStars} />
          </div>
        </div>

        <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${getProgressClass(progress)}`}>
          {getProgressLabel(progress)}
        </span>
      </div>

      {showInstrumentosVistosOnly ? (
        <p className="mt-3 text-xs text-slate-500">
          Instrumentos vistos: <strong className="text-slate-700">{instrumentosVistos}</strong>
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
          <p>Tentativas: <strong className="text-slate-700">{progress?.tentativas ?? 0}</strong></p>
          <p>Melhor: <strong className="text-slate-700">{progress?.melhorPontuacao ?? progress?.estrelas ?? 0}</strong></p>
        </div>
      )}

      <p className="mt-2 text-xs text-slate-500">
        Atualizado: {formatDateTime(progress?.atualizadoEm)}
      </p>
    </div>
  );
}

export default function GameProgressList() {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(defaultFilter);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const response = await UserServices.getAll();

    if (response.success) {
      setUsers(response.users);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const normalizedName = filter.name.trim().toLowerCase();

    return users.filter((user) => {
      const matchesName =
        !normalizedName || user.nome.toLowerCase().includes(normalizedName);
      const hasGameProgress =
        filter.game === "-1" ||
        Boolean(user.progresso?.[filter.game as "jogo1" | "jogo2"]);

      return matchesName && hasGameProgress;
    });
  }, [filter, users]);

  const totalFinished = users.reduce((total, user) => {
    const finishedGame1 = user.progresso?.jogo1?.concluido ? 1 : 0;
    const finishedGame2 = user.progresso?.jogo2?.concluido ? 1 : 0;
    return total + finishedGame1 + finishedGame2;
  }, 0);

  return (
    <>
      <section>
        <article className="rounded-[30px] bg-[linear-gradient(135deg,#1d4ed8_0%,#0f766e_100%)] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">Progresso dos jogos</p>
          <h2 className="mt-3 text-3xl font-semibold">{totalFinished} conclusões registradas</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
            Acompanhe em uma única lista as estrelas conquistadas no Jogo 1 e no Jogo 2.
          </p>
        </article>
      </section>

      <section className="mt-5 rounded-[28px] border border-white/80 bg-white/85 p-5">
        <h3 className="text-[18px] font-bold text-slate-900">Filtros</h3>
        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-start">
          <AppInput
            className="md:max-w-[285px]"
            type="text"
            label="Nome da criança"
            value={filter.name}
            onChange={(e) => setFilter((current) => ({ ...current, name: e.target.value }))}
          />

          <AppSelect
            className="md:max-w-[190px]"
            label="Jogo"
            value={filter.game}
            onChange={(e) => setFilter((current) => ({ ...current, game: e.target.value }))}
          >
            <option value="-1">Todos</option>
            <option value="jogo1">Jogo 1</option>
            <option value="jogo2">Jogo 2</option>
          </AppSelect>
        </div>
      </section>

      {loading && (
        <div className="flex justify-center">
          <AppLoader size={50} className="self-center" />
        </div>
      )}

      {!loading && (
        <section className="mt-5 overflow-hidden rounded-[30px] border border-white/80 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          <div className="grid grid-cols-[0.28fr_1.1fr_1fr_1fr_0.7fr] gap-4 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-600">
            <span>ID</span>
            <span>Criança</span>
            <span>Jogo 1</span>
            <span>Jogo 2</span>
            <span>Último acesso</span>
          </div>

          {filteredUsers.length === 0 && (
            <p className="m-5 rounded-full bg-[red] p-1 px-5 text-center text-white">
              Nenhum progresso encontrado
            </p>
          )}

          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-[0.28fr_1.1fr_1fr_1fr_0.7fr] gap-4 border-t border-slate-100 px-5 py-5 text-slate-900"
            >
              <p className="text-sm font-semibold text-slate-900">{user.codigo}</p>

              <div>
                <p className="font-bold">{user.nome}</p>
                <p className="mt-1 text-sm text-slate-500">{user.email}</p>
              </div>

              <GameProgressCell
                title="Conheça o consultório"
                progress={user.progresso?.jogo1}
                maxStars={5}
                showInstrumentosVistosOnly
              />

              <GameProgressCell
                title="Escove os dentes"
                progress={user.progresso?.jogo2}
                maxStars={3}
              />

              <p className="text-sm text-slate-500">
                {formatDateTime(user.ultimoAcesso)}
              </p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
