
/**
 * 定数
 *
 *
 */

//エラーレベル
const LOG_LEVEL_ERROR = 1
const LOG_LEVEL_WARNING = 10
const LOG_LEVEL_NOTICE = 100
const LOG_LEVEL_INFO = 1000



/**
 * 変数
 *
 *
 */

//ログファイルパス
var Log_file_path = '';


/**
 * 初期化
 *
 *
 */





///////////////////////////////////////////////////////////
//  ログ
///////////////////////////////////////////////////////////

/**
 * ログファイルPATH構築
 * 
 * @return void
 */
function log_file_path_create(){
  shell = new ActiveXObject('WScript.Shell')
  env = shell.Environment('SYSTEM')
  temp_path = env('TEMP')

  //ログファイルパス構築
  Log_file_path = temp_path + '\' + Log_file_path
}

/**
 * ログ出力
 * 
 * @oaram string message メッセージ
 * @param int level ログレベル
 * @return void
 */
function log_write(message, level)
{
  var static fso, logger

  if (!fso) {
    fso = new ActiveXObject("Scripting.FileSystemObject")
    logger = fso.OpenTextFile(Log_file_path)
  }
  
  level_string = 





}







