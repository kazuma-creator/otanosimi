function startGame(){
    // タイトル画面を隠してゲーム画面を表示
    document.getElementById("title-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    
    // ゲームオーバー表示とリトライボタンを非表示にする
    document.getElementById("gameOverMessage").textContent = "";
    document.getElementById("retry-button").style.display = "none";
    
    // スコアと連鎖数をリセット
    chainCount = 0; 
    score = 0;
    
    // スコア、ハイスコア表示の更新
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("highscore").textContent = "High Score: " + highScore;
    
    // ゲーム開始（初期パラメータの設定）
    Y(g = h = e = 9, l = p = K = 0);
  }
  
  let fallDelay = 50; // 初期落下速度（ミリ秒）
  let tickCount = 0;
  let score = 0;
  let chainCount = 0;       // 連鎖数
  let chainInProgress = false; // 連鎖中かどうかのフラグ
  
  // ローカルストレージからハイスコアを取得（なければ 0）
  let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
  
  // 得点更新用の関数（ハイスコアも更新）
  function updateScore(points) {
    score += points;
    document.getElementById("score").textContent = "Score: " + score;
    
    // 現在のスコアがハイスコアを上回った場合は更新
    if(score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      document.getElementById("highscore").textContent = "High Score: " + highScore;
    }
  }
  
  // 連鎖ボーナスの処理（連鎖が発生したタイミングで加算）
  function handleChainBonus() {
    chainCount++;  // 連鎖数を増やす
    updateScore(10 * chainCount); // 例：連鎖数に応じたボーナス得点（10点×chainCount）
  
    // 連鎖メッセージの表示
    const chainEl = document.getElementById("chainMessage");
    chainEl.textContent = chainCount + "連鎖！";
    setTimeout(() => {
      chainEl.textContent = "";
    }, 1000);
  }
  
  // リトライ処理：リトライボタンが押されたときに呼ばれる
  function retryGame() {
    // ゲーム画面の初期化など必要なリセット処理を行い、ゲームを再スタート
    startGame();
  }
  
  // （元のコードの初期化処理）
  for (M = N = [i = 113]; --i; M[i - 1] = i % 8 < 2 | i < 8) {
    function Y() {
      tickCount++; // 毎ループでカウント
      e++;
      if (e %= 10) {
        for (N = [K - 2 ? 
                  // 入力やぷよの動きの処理（省略）…
                  K - 50 ? h -= M[h + l - K] | M[h - K] ? 0 : K 
                        : M[h + p] || (x = p, p = -l, l = x)
                        : e = 0], K = 0; 
             ++i < 113; 
             N[i] = M[i])
          N[h] = B >> 2, 
          N[h + l] = B % 4 - B % 1 + 2;
      }
  
      // 落下が完了したタイミングや新たな消去判定の場合
      if (!e && (h -= 8, !g || M[h] + M[h + l])) {
        // 連鎖開始の判定を行う
        C = [M = N];
        for (i = g = 1; ++i < 103; !M[i] * n && (M[i] = n, g = M[i + 8] = 0))
          n = M[i + 8];
  
        let chainTriggered = false; // 今回の連鎖反応でボーナス処理を呼んだかどうか
        let puyoCleared = false;    // ぷよが消えたかどうか
  
        for (; --i;) {
          n = c = 0;
          for (E = [i]; g & M[i] > 1 & n >= c >> 2; 
               t > 102 | C[t] | M[i] - M[t] || (E[++n] = C[t] = t))
            t = p, p = -l, l = t, t += E[c++ >> 2];
  
          // 消去対象がある場合
          if (c > 16 && n) {
            puyoCleared = true; // ぷよが消えたのでフラグを立てる
            for (; c > 16 && n; ) {
              g = M[E[n--]] = 0;
              updateScore(10);
            }
          }
        }
  
        // ぷよが消えた場合、連鎖ボーナス処理を実行（この連鎖で1回だけ）
        if (puyoCleared && !chainTriggered) {
          handleChainBonus();
          chainTriggered = true;
        }
  
        // 新たなぷよが登場するタイミングで、ぷよが消えなかった場合は連鎖リセット
        if (!puyoCleared) {
          chainCount = 0;
          chainInProgress = false;
        }
  
        // 新たなぷよの登場処理（ここで新ターン開始）
        B = g ? Math.random(h = 100, l = 8, p = -1) * 16 + 8 : --e;
      }
  
      // 描画処理
      for (i = 104, S = ""; i--;
           S += n-- ? n
                ? `<a class='puyo' style='background:#${248 * n}; color:#fff;'>●</a>`
                : i % 8 ? "■" : "■<br>"
                : "＿")
        n = N[i];
      D.innerHTML = S;
      document.body.style.backgroundColor = "#191950"; // 背景色の変更
  
      // 一定回数ごとに落下速度を上げる
      if (tickCount % 100 === 0 && fallDelay > 10) {
        fallDelay--;
      }
  
      // ゲーム継続のためのループ呼び出し
      // ※ここで M[100]*g が真の場合、ゲームオーバーと判定しループを止める
      if (M[100] * g) {
        // ゲームオーバー時の処理
        document.getElementById("gameOverMessage").textContent = "Game Over";
        document.getElementById("retry-button").style.display = "block";
      } else {
        setTimeout(Y, fallDelay);
      }
    }
  }
  