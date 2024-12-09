// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendRNFunction(funcName: string, param?: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ReactNativeWebView } = window as any
  if (ReactNativeWebView) {
    ReactNativeWebView.postMessage(JSON.stringify({ type: funcName, data: param }))
  }
}
