import React, { useEffect } from "react";
import "./Ticket.scss";
import TicketItem from "./TicketItem";
const doiBong = [
    "Hồng Lĩnh Hà Tĩnh",
    "Hà Nội FC",
    "Hoàng Anh Gia Lai",
    "Sài Gòn FC",
    "Than Quảng Ninh",
    "SHB Đà Nẵng",
    "Becamex Bình Dương",
    "Nam Định",
    "Hải Phòng",
    "Thanh Hóa",
    "Quảng Nam FC",
    "SLNA",
    "Bình Định FC",
    "XSKT Cần Thơ",
    "Đồng Tháp FC",
    "Hồ Chí Minh City FC",
    "Sông Lam Nghệ An",
    "Công An Nhân Dân",
    "Phố Hiến FC",
    "Công An Nhân Dân (CSVC)",
    "QNK Quảng Nam FC",
    "Sông Lam Nghệ An (CSVC)",
  ];
  function taoNgayGio() {
    const soNgay = Math.floor(Math.random() * 365); // Tạo số ngày ngẫu nhiên từ 0 đến 364
    const ngay = new Date(); // Ngày hiện tại
    ngay.setDate(ngay.getDate() + soNgay); // Trừ số ngày từ ngày hiện tại để tạo ngày trong quá khứ
    return ngay.toISOString().split('T')[0] + " " + ngay.toTimeString().split(' ')[0].substring(0, 5);
  }
  
  // Hàm tạo ngẫu nhiên trận đấu
  function taoTranDau(soTran) {
    let danhSachTranDau = [];
    for (let i = 0; i < soTran; i++) {
      const doiKhac = doiBong[Math.floor(Math.random() * doiBong.length)];
      const laTranNha = Math.random() > 0.5; // Xác định ngẫu nhiên đây có phải trận sân nhà của Hồng Lĩnh Hà Tĩnh không
      const homeTeam = laTranNha ? "Hồng Lĩnh Hà Tĩnh" : doiKhac;
      const awayTeam = laTranNha ? doiKhac : "Hồng Lĩnh Hà Tĩnh";
      const giaiDau = "V-League";
      const ngayGio = taoNgayGio();
  
      danhSachTranDau.push({
        homeTeam,
        awayTeam,
        giaiDau,
        ngay:ngayGio?.split(" ")[0],
        gio:ngayGio?.split(" ")[1],
      });
    }
    return danhSachTranDau;
  }
  
  // Tạo danh sách trận đấu
  const danhSachTranDau = taoTranDau(12); // Tạo 5 trận đấu ngẫu nhiên
  console.log(danhSachTranDau);
  console.log(danhSachTranDau);
const ListTicket = () => {
 
  return (
    <div class="container bootstrap snippets bootdeys">
      <section class="blog" id="blog">
        <div class="container">
          <div class="title">
            <h2>Ticket</h2>
          </div>
          <div class="">
            {danhSachTranDau.map(i => <TicketItem {...i} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListTicket;
