import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, isLogin, logout } from "../../store/authSlice";
import { Avatar, Popover } from "antd";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const content = (
    <div>
      <p onClick={() => navigate("/profile")} className="point">Tài khoản của tôi</p>
      <p className="point">Đơn mua</p>
    </div>
  );
  const login = useSelector(isLogin);
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  return (
    <header className="header text-white">
      <div className="container">
        <div className="header-cnt">
          <div className="header-cnt-top fs-13 py-2 flex align-center justify-between">
            <div className="header-cnt-top-l">
              <ul className="flex top-links align-center">
                <li className="vert-line"></li>
                <li className="flex align-center">
                  <span className="fs-13">Theo dõi chúng tôi</span>
                  <ul className="social-links flex align-center">
                    <li className="mx-2">
                      <a href="www.facebook.com" className="fs-15">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li className="mx-2">
                      <a href="www.instagram.com" className="fs-15">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header-cnt-top-r">
              <ul className="top-links flex align-center">
                <li>
                  <Link to="/chatapp">
                    <span className="top-link-itm-ico mx-2">
                      <i className="fa-regular fa-message"></i>
                    </span>
                    <span className="top-link-itm-txt">Nhóm cộng đồng</span>
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="top-link-itm">
                    <span className="top-link-itm-ico mx-2">
                      <i className="fa-solid fa-blog"></i>
                    </span>
                    <span className="top-link-itm-txt">Bài viết</span>
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="top-link-itm">
                    <span className="top-link-itm-ico mx-2">
                      <i className="fa-solid fa-blog"></i>
                    </span>
                    <span className="top-link-itm-txt">Cửa hàng</span>
                  </Link>
                </li>
                <li className="vert-line"></li>
                {login && (
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Popover placement="bottom" content={content}>
                      <li>
                        <div>
                          <Avatar
                            style={{
                              border: "2px solid white",
                              background: "white",
                              color: "rgb(41, 174, 189)",
                              fontWeight: "bold",
                            }}
                          >
                            {currentUser
                              ? currentUser.fullname
                                ? currentUser.fullname[0].toUpperCase()
                                : "T"
                              : "T"}
                          </Avatar>{" "}
                          {currentUser && currentUser.fullname}
                        </div>
                      </li>{" "}
                    </Popover>
                  </div>
                )}
                {!login && (
                  <li>
                    <Link to="/login">
                      <span className="top-link-itm-txt">Đăng kí</span>
                    </Link>
                  </li>
                )}
                <li className="vert-line"></li>
                {login && (
                  <li>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatch(logout());
                        window.location.href = "/login";
                      }}
                    >
                      <span className="top-link-itm-txt">Đăng xuất</span>
                    </div>
                  </li>
                )}
                {!login && (
                  <li>
                    <Link to="/login">
                      <span className="top-link-itm-txt">Đăng nhập</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="header-cnt-bottom">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
