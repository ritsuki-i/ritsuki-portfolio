import React, { useEffect, useState, useRef } from "react";
import "./Contact.css";
import { useFormik } from "formik";
import emailjs from "emailjs-com";

export default function Contact({handleValueChange}) {
  //入力情報の送信状態
  const [isSent, setIsSent] = useState(false);

  const form = useRef();

  //入力情報が適しているか判別
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
  });

  //入力情報の初期化
  const reset = () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    name.value = "";
    email.value = "";
    message.value = "";

    SaveLocalstrage();
  };

  //入力データを転送
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const postData = {
      user_name: name.value,
      user_email: email.value,
      message: message.value,
    };

    setIsSent(true);

    emailjs
      .sendForm(
        "service_g855gzi",
        "template_u1ez4y8",
        form.current,
        "S96X1DSvrk5YIziBd"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  //入力データをローカルストレージに保存
  const SaveLocalstrage = () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    localStorage.setItem("name", name.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("message", message.value);
  };

  //ページ起動時保存データを入力
  useEffect(() => {
    let name_value = localStorage.getItem("name");
    let email_value = localStorage.getItem("email");
    let message_value = localStorage.getItem("message");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    name.value = name_value;
    email.value = email_value;
    message.value = message_value;
  }, []);

  return (
    <div className="Contact">
      <div className="main">
        <div className="contact">
          <h1 className="title">Contact</h1>
          {isSent ? (
            <div className="sentMessage">
              <p>送信が完了しました。</p>
              <button onClick={() => handleValueChange("Home")}>
                Homeに戻る
              </button>
            </div>
          ) : (
            <form ref={form} onSubmit={handleSubmit} onChange={SaveLocalstrage}>
              <div className="field">
                <label className="label-submit">お名前</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="name"
                    name="user_name"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label-submit">メールアドレス</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    name="user_email"
                    id="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span>{formik.errors.email}</span>
                  ) : null}
                </div>
              </div>
              <div className="field">
                <label className="label-submit">内容</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    id="message"
                    name="message"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="submit">
                    送信する
                  </button>
                  <button
                    className="button-reset"
                    type="button"
                    onClick={reset}
                  >
                    リセット
                  </button>
                </div>
              </div>
              <input type="hidden" name="redirectTo" value="" />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
