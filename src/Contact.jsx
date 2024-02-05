import React from "react";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import "./Contact.css";
import { useFormik } from "formik";


export default function Contact() {

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

  const reset = () => {
    document.contact.reset();
  }

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
      console.log("success");
    } catch (e) {
      console.log("An error occurred", e);
    }

    alert("送信完了しました。お問い合わせありがとうございます。");
  };

  return (
    <div className="Contact">
      <Header />
      <div className="main">
        <div className="contact">
            <h1 className="title">Contact</h1>
            <form action="https://api.staticforms.xyz/submit" method="post" onSubmit={formik.handleSubmit}>
                <input type="hidden" name="accessKey" value="8a33a80c-6e03-421d-ac8b-44ae016c3e21"/>
                <div className="field">
                    <label className="label-submit">お名前</label>
                    <div className="control">
                        <input className="input" type="text" id="name" required/>
                    </div>
                </div>
                <div className="field">
                    <label className="label-submit">メールアドレス</label>
                    <div className="control">
                        <input type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />{formik.touched.email && formik.errors.email ? (<span>{formik.errors.email}</span>) : null}
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
                        <input type="submit" className="submit" value="送信する" onClick={ handleSubmit }/>
                        <button className="button-reset" type="button" onClick={reset}>リセット</button>
                    </div>
                </div>
                <input type="hidden" name="redirectTo" value=""/>
            </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
