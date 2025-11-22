import React, { useState } from 'react';
import { ScanLine, Store, Keyboard, Smartphone, CheckCircle, Loader2, Share2, QrCode, Copy } from 'lucide-react';

export const Pay: React.FC = () => {
  const [method, setMethod] = useState<'scan' | 'code' | 'receive'>('code');
  const [merchantCode, setMerchantCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const btcAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const handlePayment = () => {
    if (method === 'code' && merchantCode.length < 3) return;
    
    setIsLoading(true);
    // Simulate network processing time
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const resetPayment = () => {
    setIsSuccess(false);
    setMerchantCode('');
    setMethod('code');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSuccess) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 pb-20">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-400 mb-8 text-center">You have successfully paid <span className="text-white font-semibold">{method === 'scan' ? 'OK Supermarket' : 'Merchant #' + merchantCode}</span></p>

        <div className="w-full max-w-sm bg-levon-800 rounded-2xl p-6 border border-levon-700 mb-8 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-levon-primary to-levon-accent"></div>
           <div className="text-center border-b border-levon-700 pb-6 mb-6">
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest">Total Paid</p>
              <h3 className="text-4xl font-bold text-white">$54.20</h3>
           </div>
           
           <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className="text-green-500 font-bold flex items-center gap-1">
                  Completed <CheckCircle size={12} />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Date & Time</span>
                <span className="text-white font-medium">{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Reference ID</span>
                <span className="text-white font-medium font-mono">#LVN-88293</span>
              </div>
               <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment Method</span>
                <span className="text-white font-medium">USD Wallet</span>
              </div>
           </div>
        </div>

        <div className="flex gap-3 w-full max-w-sm">
          <button 
            onClick={resetPayment}
            className="flex-1 bg-levon-800 hover:bg-levon-700 text-white font-bold py-3.5 rounded-xl border border-levon-700 transition-colors"
          >
            Done
          </button>
          <button className="flex items-center justify-center w-14 bg-levon-800 hover:bg-levon-700 text-levon-primary rounded-xl border border-levon-700 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-6">Payments</h2>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <button 
          onClick={() => setMethod('scan')}
          className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${method === 'scan' ? 'bg-levon-800 border-levon-primary text-levon-primary' : 'bg-levon-800/30 border-levon-700 text-gray-400 hover:bg-levon-800'}`}
        >
          <ScanLine size={24} />
          <span className="text-xs font-medium">Scan QR</span>
        </button>
        <button 
          onClick={() => setMethod('code')}
          className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${method === 'code' ? 'bg-levon-800 border-levon-primary text-levon-primary' : 'bg-levon-800/30 border-levon-700 text-gray-400 hover:bg-levon-800'}`}
        >
          <Keyboard size={24} />
          <span className="text-xs font-medium">Enter Code</span>
        </button>
        <button 
          onClick={() => setMethod('receive')}
          className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${method === 'receive' ? 'bg-levon-800 border-levon-primary text-levon-primary' : 'bg-levon-800/30 border-levon-700 text-gray-400 hover:bg-levon-800'}`}
        >
          <QrCode size={24} />
          <span className="text-xs font-medium">Receive BTC</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-levon-800/30 rounded-3xl border border-levon-700/50 p-6 relative overflow-hidden">
        {method === 'receive' ? (
           <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <h3 className="text-lg font-semibold text-white mb-1">Receive Bitcoin</h3>
              <p className="text-sm text-gray-400 mb-6">Scan to pay into your wallet</p>
              
              <div className="bg-white p-4 rounded-2xl mb-6 shadow-lg">
                 {/* CSS QR Code Simulation */}
                 <div className="w-48 h-48 bg-white flex flex-wrap content-start relative">
                    <div className="absolute inset-0 border-4 border-black"></div>
                    <div className="absolute top-4 left-4 w-10 h-10 border-4 border-black bg-black"></div>
                    <div className="absolute top-4 left-4 w-6 h-6 border border-white bg-white m-1"></div>
                    <div className="absolute top-6 left-6 w-2 h-2 bg-black"></div>

                    <div className="absolute top-4 right-4 w-10 h-10 border-4 border-black bg-black"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 border border-white bg-white m-1"></div>
                    <div className="absolute top-6 right-6 w-2 h-2 bg-black"></div>

                    <div className="absolute bottom-4 left-4 w-10 h-10 border-4 border-black bg-black"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 border border-white bg-white m-1"></div>
                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-black"></div>
                    
                    {/* Random dots for aesthetics */}
                    <div className="absolute top-20 left-20 w-4 h-4 bg-black"></div>
                    <div className="absolute top-10 left-24 w-4 h-4 bg-black"></div>
                    <div className="absolute bottom-10 right-12 w-6 h-6 bg-black"></div>
                    <div className="absolute top-24 right-8 w-3 h-12 bg-black"></div>
                    
                    <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-1 opacity-20">
                       {[...Array(36)].map((_, i) => (
                          <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'visible' : 'invisible'}`}></div>
                       ))}
                    </div>
                    
                    {/* Logo Overlay */}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                           <div className="w-full h-full bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">₿</div>
                        </div>
                     </div>
                 </div>
              </div>

              <div className="w-full bg-levon-900 rounded-xl p-3 flex items-center justify-between border border-levon-700 mb-4 group hover:border-levon-600 transition-colors">
                 <div className="truncate flex-1 mr-2">
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Wallet Address</p>
                    <p className="text-xs text-gray-300 font-mono truncate">{btcAddress}</p>
                 </div>
                 <button 
                   onClick={copyToClipboard}
                   className="p-2 bg-levon-800 hover:bg-levon-700 rounded-lg text-levon-primary transition-colors relative"
                 >
                   {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                 </button>
              </div>
              
              <button className="flex items-center gap-2 text-sm text-levon-primary hover:text-emerald-400 font-medium">
                 <Share2 size={16} /> Share Payment Request
              </button>
           </div>
        ) : method === 'scan' ? (
          <div className="text-center cursor-pointer" onClick={handlePayment} title="Click to simulate scan">
            <div className="w-64 h-64 border-2 border-levon-primary rounded-3xl relative mx-auto mb-6 flex items-center justify-center bg-black/50 overflow-hidden group">
               {isLoading && (
                 <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center">
                    <Loader2 size={48} className="text-levon-primary animate-spin" />
                 </div>
               )}
               <div className="absolute inset-0 border-t-4 border-l-4 border-levon-primary rounded-tl-3xl w-12 h-12"></div>
               <div className="absolute top-0 right-0 border-t-4 border-r-4 border-levon-primary rounded-tr-3xl w-12 h-12"></div>
               <div className="absolute bottom-0 left-0 border-b-4 border-l-4 border-levon-primary rounded-bl-3xl w-12 h-12"></div>
               <div className="absolute bottom-0 right-0 border-b-4 border-r-4 border-levon-primary rounded-br-3xl w-12 h-12"></div>
               <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
               <span className="text-gray-500 text-sm group-hover:text-white transition-colors">Tap to Simulate Scan</span>
            </div>
            <p className="text-gray-400">Align QR code within the frame</p>
          </div>
        ) : (
          <div className="w-full max-w-xs space-y-6">
            <div className="text-center">
               <div className="w-16 h-16 bg-levon-700 rounded-full flex items-center justify-center mx-auto mb-4 text-levon-accent">
                 <Store size={32} />
               </div>
               <h3 className="text-xl font-semibold text-white">Pay Merchant</h3>
               <p className="text-sm text-gray-400">Enter the 6-digit store code</p>
            </div>
            
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1 block">Merchant Code</label>
              <input 
                type="text" 
                placeholder="123 456" 
                value={merchantCode}
                onChange={(e) => setMerchantCode(e.target.value)}
                className="w-full bg-levon-900 border border-levon-700 rounded-xl px-4 py-3 text-center text-2xl font-mono text-white focus:outline-none focus:border-levon-primary"
                maxLength={6}
              />
            </div>
             
             <button 
               onClick={handlePayment}
               disabled={isLoading || merchantCode.length < 3}
               className="w-full bg-levon-primary hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-levon-900 font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
             >
               {isLoading ? (
                 <>
                   <Loader2 size={20} className="animate-spin" />
                   Processing...
                 </>
               ) : (
                 'Verify & Pay'
               )}
             </button>
          </div>
        )}
      </div>
      
      {method !== 'receive' && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Nearby Stores Accepting Levon</h4>
          <div className="flex gap-3 overflow-x-auto pb-2">
             {['OK Supermarket', 'Pick n Pay', 'Nandos', 'Chicken Inn'].map(store => (
               <div key={store} className="px-4 py-2 bg-levon-800 rounded-lg text-sm text-white whitespace-nowrap border border-levon-700">
                 {store}
               </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};