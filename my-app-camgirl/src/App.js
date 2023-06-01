import { useState } from 'react';
import './App.css';
import decorationImage from './images/tree.png';

function App() {
  // 初期値は空文字
  const initialValues = { mailAddress: "", password: "" };
  
  // formValuesは現在のフォームの値を保持するためのもの、初期値はinitialValues
  // setFormValuesはformValuesの値は更新するための関数
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});


  const handleChange = (e) => {
    // イベントが発生した要素のname属性とvalue属性を取得
    const { name, value } = e.target;
    // 既存のformValuesオブジェクトのコピーを作成
    // nameプロパティに対して、入力されたvalueを設定
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    // デフォルトのフォーム送信イベントをキャンセルする
    e.preventDefault();
    // ログイン情報を送信
    // バリデーションチェックをする
    setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    // バリエーションエラーを格納するためのオブジェクト
    const errors = {};
    // メールアドレスの正規表現
    const regex = 
      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    // もしmailAddressの値が存在しなかったらtrue
    if(!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください。";
    // 指定した文字列が正規表現パターンと一致するか
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください。";
    };


    // もしパスワードの値が存在しなかったらtrue
    if(!values.password) {
      errors.password = "パスワードを入力してください。";
      // 4文字以下だったら
    } else if (values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください。";
      // 15文字以上だったら
    } else if (values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください。";
    }

    return errors;
  };

  return (
    <>
      <div className='decorationContainer'>
        <img src={decorationImage} alt='木の飾り' />
      </div>
      <div className="formContainer">
        {/* フォームが送信されると発生する */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>ログイン</h1>
          <div className='uiForm'>
            <div className='formField'>
              <label>E-mail</label>
              <input 
                type='text' 
                placeholder='E-mail' 
                name='mailAddress'
            // フィールドの値が変更されたときにhandleChangeが呼び出される
                onChange={(e) => handleChange(e)}
                />
            </div>
            <p className='errorMsg'>{formErrors.mailAddress}</p>
            <div className='formField'>
              <label>パスワード</label>
              <input 
                type='text' 
                placeholder='パスワード' 
                name='password'
              // フィールドの値が変更されたときにhandleChangeが呼び出される
                onChange={(e) => handleChange(e)}
              />
            </div>
            <p className='errorMsg'>{formErrors.password}</p>
            {/* ログインボタン */}
            <button className='submitButton'>ログイン</button>
            <hr/>

            <p>アカウントをお持ちでない方はこちら</p>
            <div className='buttonContainer'>
              <button className='createAccountButton'>新規登録</button>
              <button className='guestButton'>ゲストログイン</button>

            </div>
          </div>
        </form>
      </div>
      <div className='decorationContainer-2'>
        <img src={decorationImage} alt='木の飾り' />
      </div>
    </>
  );
}

export default App;

