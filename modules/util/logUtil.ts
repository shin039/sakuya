// -----------------------------------------------------------------------------
// Log Utility 
// -----------------------------------------------------------------------------
const _fatal      = 9;
const _error      = 7;
const _info       = 3;
const _warn       = 1;
const _debug      = 0;

let _loglevel = process.env.LOG_LEVEL;
if(! _loglevel) _loglevel = _info;

const _PrintLevel = _loglevel;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Function
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/**
 * PrintLog
 */
const printLog = (content, lv = _info) => {
  if(lv < _PrintLevel) return;
  
  if(lv === _debug) console.debug("[DBG]: ", content);
  if(lv === _warn)  console.warn ("[WRN]: ", content);
  if(lv === _info)  console.info ("[INF]: ", content);
  if(lv === _error) console.error("[ERR]: ", content);
  if(lv === _fatal) console.error("[FTL]: ", content);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Exports
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
exports.ftl = (msg) => printLog(msg, _fatal);
exports.err = (msg) => printLog(msg, _error);
exports.out = (msg) => printLog(msg, _info);
exports.wrn = (msg) => printLog(msg, _warn);
exports.dbg = (msg) => printLog(msg, _debug);
