import React, { useEffect, useState } from "react";
import "./../ticket/Ticket.scss";
import { matchApi } from "../../api/match.api";
import TicketItem from "../ticket/TicketItem";
import moment from "moment";

const Listmatch = () => {
  const [listMatch, setListMatch] = useState([]);
  const getListMatch = async () => {
    try {
      const res = await matchApi.getListmatch();
      if (res.data.status === 200) {
        setListMatch(res.data.data || []);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getListMatch();
  }, []);
  return (
    <div class="container bootstrap snippets bootdeys">
      <section class="blog" id="blog">
        <div class="container">
          <div class="title">
            <h2>Lịch thi đấu</h2>
          </div>
          <div class="">
            {listMatch.sort((i,j) => i.statusMatch -j.statusMatch ).map((i) => (
              <TicketItem
              isMatch={true}
                awayScore={i.awayScore}
                homeScore={i.homeScore}
                statusMatch={i.statusMatch}
                ngay={moment(i.dateTime).format("YYYY-MM-DD")}
                gio={moment(i.dateTime).format("hh:ss")}
                {...i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listmatch;
