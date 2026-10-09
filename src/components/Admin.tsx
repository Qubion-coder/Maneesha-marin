import React, { useState } from 'react';
import { Check, Link as LinkIcon, FileText } from 'lucide-react';

export const Admin: React.FC = () => {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [inviteType, setInviteType] = useState('both');
  const [linkCopied, setLinkCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);

  const getDisplayName = (p: string, n: string) => {
    const trimmedName = n.trim();
    if (!trimmedName) return '';

    switch (p) {
      case 'Mr.': return `Mr. ${trimmedName}`;
      case 'Mrs.': return `Mrs. ${trimmedName}`;
      case 'Miss': return `Miss ${trimmedName}`;
      case 'Mr. & Mrs.': return `Mr. & Mrs. ${trimmedName}`;
      case 'Family': return `${trimmedName} and Family`;
      case 'Dear': return trimmedName; // Handled specially in greeting
      default: return `${p} ${trimmedName}`;
    }
  };

  const getGreeting = (p: string, n: string) => {
    const trimmedName = n.trim();
    if (!trimmedName) return '';

    if (p === 'Dear') {
      return `Dear ${trimmedName}`;
    }
    return `Dear ${getDisplayName(p, n)}`;
  };

  const baseUrl = window.location.origin;

  const displayName = getDisplayName(prefix, guestName);

  const generatedLink = guestName.trim()
    ? `${baseUrl}/${encodeURIComponent(guestName.trim())}?prefix=${encodeURIComponent(prefix)}${inviteType !== 'both' ? `&invite=${inviteType}` : ''}`
    : baseUrl;

  const getInviteText = (type: string) => {
    if (type === 'wedding') return 'wedding ceremony';
    if (type === 'homecoming') return 'homecoming celebration';
    return 'wedding and homecoming';
  };

  const generatedMessage = guestName.trim() ? `${getGreeting(prefix, guestName)} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our ${getInviteText(inviteType)} invitation and all the event details through the link below 🌐:\n\n${generatedLink}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Maneesha & Marin` : '';

  const handleCopyLink = async () => {
    if (!guestName.trim()) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyMessage = async () => {
    if (!guestName.trim()) return;
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setMessageCopied(true);
      setTimeout(() => setMessageCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory text-stone-800 p-6 md:p-12 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 border border-[#D4AF37]/30">
        <h1 className="text-3xl font-serif text-center mb-8 text-stone-800">Wedding Invitation Link Generator</h1>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600 uppercase tracking-widest">Prefix</label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-stone-600 uppercase tracking-widest">Guest Name</label>
              <input
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-600 uppercase tracking-widest">Invite Type</label>
            <select
              value={inviteType}
              onChange={(e) => setInviteType(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
            >
              <option value="both">Both (Wedding & Homecoming)</option>
              <option value="wedding">Wedding Only</option>
              <option value="homecoming">Homecoming Only</option>
            </select>
          </div>

          <div className="pt-6 border-t border-stone-100 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600 uppercase tracking-widest">Generated Link</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  readOnly
                  value={guestName.trim() ? generatedLink : ''}
                  className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 text-stone-500 text-sm outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  disabled={!guestName.trim()}
                  className="h-12 px-6 flex items-center justify-center gap-2 bg-stone-800 hover:bg-black text-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium transition-all sm:min-w-[140px]"
                >
                  {linkCopied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                  {linkCopied ? 'Copied!' : 'Copy Link Only'}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600 uppercase tracking-widest">Full Message Template</label>
              <textarea
                readOnly
                value={generatedMessage}
                rows={12}
                className="w-full p-4 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 text-sm outline-none resize-none"
              />
              <button
                onClick={handleCopyMessage}
                disabled={!guestName.trim()}
                className="w-full h-12 mt-2 flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C5A030] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                {messageCopied ? <Check className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                {messageCopied ? 'Message Copied!' : 'Copy Full Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

