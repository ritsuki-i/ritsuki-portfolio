import React, { useEffect } from "react";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import "./Contact.css";
import { useFormik } from "formik";

export default function Contact() {
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
    document.contact.reset();
  };

  //入力データを転送
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const postData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    try {
      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: postData,
        headers: { "Content-Type": "application/json" },
      });
      

      const json = await res.json();

      if (json.success) {
        console.log("success");
        alert("送信完了しました。お問い合わせありがとうございます。");
      } else {
        console.log("error");
      }

    } catch (e) {
      console.log("An error occurred", e);
    }

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
      <Header />
      <div className="main">
        <div className="contact">
          <h1 className="title">Contact</h1>
          <form
            action="https://api.staticforms.xyz/submit"
            method="post"
            onSubmit={formik.handleSubmit}
            onChange={SaveLocalstrage}
          >
            <input
              type="hidden"
              name="accessKey"
              value="8a33a80c-6e03-421d-ac8b-44ae016c3e21"
            />
            <div className="field">
              <label className="label-submit">お名前</label>
              <div className="control">
                <input className="input" type="text" id="name" required />
              </div>
            </div>
            <div className="field">
              <label className="label-submit">メールアドレス</label>
              <div className="control">
                <input
                  type="email"
                  name="email"
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
                <textarea className="textarea" id="message" required></textarea>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  type="submit"
                  className="submit"
                  value="送信する"
                  onClick={handleSubmit}
                />
                <button className="button-reset" type="button" onClick={reset}>
                  リセット
                </button>
              </div>
            </div>
            <input type="hidden" name="redirectTo" value="" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
