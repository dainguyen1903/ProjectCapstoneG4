import React, { useEffect, useState } from "react";
import "./../ticket/Ticket.scss";
import { matchApi } from "../../api/match.api";
import TicketItem from "../ticket/TicketItem";
import moment from "moment";
import { useFetcher } from "react-router-dom";
import { listMatchByDate, sortObjtDate } from "../../utils/helpers";
const MODE = {
  RESULT: 2,
  PENDING: 1,
};
const Listmatch = () => {
  const [listMatch, setListMatch] = useState([]);
  const [listAll, setListAll] = useState([]);
  const [mode, setMode] = useState(MODE.PENDING);
  const getListMatch = async () => {
    try {
      const res = await matchApi.getListmatch();
      if (res.data.status === 200) {
        setListMatch(
          res.data.data?.filter(
            (item) =>
              item.statusMatch === "0" || item.statusMatch === "Chưa băt đầu"
          )
        );
        setListAll(res.data.data || []);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getListMatch();
  }, []);

  useEffect(() => {
    if (mode == MODE.PENDING) {
      setListMatch(
        listAll.filter(
          (item) =>
            item.statusMatch === "0" || item.statusMatch === "Chưa băt đầu"
        )
      );
    } else {
      setListMatch(
        listAll.filter(
          (item) =>
            item.statusMatch != "0" && item.statusMatch != "Chưa băt đầu"
        )
      );
    }
  }, [mode]);
  const listByDate = listMatchByDate(listMatch);
  const renderlistMatch = (list) => {
    return list.map((i) => (
      <TicketItem
        isMatch={true}
        awayScore={i.awayScore}
        homeScore={i.homeScore}
        statusMatch={i.statusMatch}
        ngay={moment(i.dateTime).format("YYYY-MM-DD")}
        gio={moment(i.dateTime).format("hh:ss")}
        {...i}
      />
    ));
  };
  return (
    <div class="container bootstrap snippets bootdeys">
      <section class="blog" id="blog">
        <div class="container">
          <div class="matchMode-wrap">
            <div
              onClick={() => setMode(MODE.PENDING)}
              style={{
                color: mode === MODE.PENDING && "white",
                background: mode === MODE.PENDING && "rgb(41, 174, 189)",
              }}
              class="matchMode-item"
            >
              Lịch thi đấu
            </div>
            <div
              style={{
                color: mode === MODE.RESULT && "white",
                background: mode === MODE.RESULT && "rgb(41, 174, 189)",
              }}
              onClick={() => setMode(MODE.RESULT)}
              class="matchMode-item"
            >
              Kết quả
            </div>
          </div>
          <div class="">
            {sortObjtDate(Object.keys(listByDate)).map((key) => (
              <div>
                <h1 style={{ color: "rgb(41, 174, 189)" }}>{key}</h1>
                <div>{renderlistMatch(listByDate[key])}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listmatch;
