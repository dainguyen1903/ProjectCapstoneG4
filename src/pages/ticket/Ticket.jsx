import React, { useEffect, useState } from "react";
import "./../ticket/Ticket.scss";
import { matchApi } from "../../api/match.api";
import TicketItem from "../ticket/TicketItem";
import moment from "moment";
import { STATUS_MATCH } from "../../constants/common";
import { listMatchByDate, sortObjtDate } from "../../utils/helpers";

const ListTicket = () => {
  const [listMatch, setListMatch] = useState([]);
  const getListMatch = async () => {
    try {
      const res = await matchApi.getListmatch();
      if (res.data.status === 200) {
        setListMatch(res.data.data || []);
      }
    } catch (error) { }
  };
  //
  const listByDate = listMatchByDate(listMatch.filter(i => i.statusMatch === STATUS_MATCH.PENDING))
  const renderlistMatch = (list) => {
    return list.map((i) => (
      <TicketItem

        awayScore={i.awayScore}
        homeScore={i.homeScore}
        statusMatch={i.statusMatch}
        ngay={moment(i.dateTime).format("YYYY-MM-DD")}
        gio={moment(i.dateTime).format("hh:ss")}
        {...i}
      />
    ))
  }
  useEffect(() => {
    getListMatch();
  }, []);
  return (
    <div class="container bootstrap snippets bootdeys">
      <section class="blog" id="blog">
        <div class="container">
          <div class="title">
            <h2>Mua vé các trận đấu sắp diễn ra</h2>
          </div>
          <div class="">
            {
             sortObjtDate(Object.keys(listByDate)).map(key => <div>
                <h1 style={{color:"rgb(41, 174, 189)"}}>{key}</h1>
                <div>
                  {renderlistMatch(listByDate[key])}
                </div>
              </div>)
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListTicket;
