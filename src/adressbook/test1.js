
/**
 * 定数
 *
 *
 */




/**
 * 変数
 *
 *
 */






/**
 * 初期化
 *
 *
 */





///////////////////////////////////////////////////////////
//  ログ
///////////////////////////////////////////////////////////

/**
 * ログ出力
 * 
 * @oaram string message メッセージ
 * @return void
 */
function log_write(message)
{
  static fso

  if (!fso) {
    fso = new ActiveXObject("Scripting.FileSystemObject")
  }
  
  dt = new Date()

  logger = fso.OpenTextFile(log_get_file_path(), 8)
  logger.WriteLine(dt.toISOString() + ':' + message)
  logger.close()
}

/**
 * ログファイルPATH構築
 * 
 * @return string
 */
function log_get_file_path(){
  static log_file_path

  if (!log_file_path) {
    shell = new ActiveXObject('WScript.Shell')
    env = shell.Environment('SYSTEM')
    temp_path = env('TEMP')
    log_file_path = temp_path + '\' + Log_file_path
  }
  return log_file_path
}

/**
 * エラーログ出力
 * 
 * @oaram string message メッセージ
 * @return void
 */
function log_write_error(message)
{
  log_write('ERROR:' + message)
}

/**
 * ログ出力
 * 
 * @oaram string message メッセージ
 * @return void
 */
function log_write_info(message)
{
  log_write('INFO:' + message)
}





