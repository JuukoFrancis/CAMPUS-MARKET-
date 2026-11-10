const fallbacks = [
  'Sure, that works for me 👍',
  'Yes, I can do that. See you at the library steps at 5?',
  'It is still available. I will keep it aside for you.',
]

const rules = [
  {
    test: /(price|discount|negotiat|cheaper|lower|reduce|best offer)/,
    reply: 'I can do a small discount if you collect today. What is your best offer?',
  },
  {
    test: /(meet|pick\s*(it\s*)?up|collect|where|when|today|tomorrow|evening|morning|afternoon|library|gate|hostel|time)/,
    reply: 'Sure — the library steps work. What time are you free?',
  },
  {
    test: /(available|still|sold)/,
    reply: 'Yes, it is still available. I can keep it aside for you.',
  },
  {
    test: /(condition|damage|scratch|battery|working|fault|broken)/,
    reply: 'It is in good shape — happy to show you everything before you pay.',
  },
  {
    test: /(deliver|delivery|drop|bring)/,
    reply: 'I can meet you on campus, but I do not deliver off campus.',
  },
  {
    test: /(thank|thanks)/,
    reply: 'You are welcome! See you on campus.',
  },
]

export function autoReply(text = '', index = 0) {
  const message = text.toLowerCase()
  const match = rules.find((rule) => rule.test.test(message))
  if (match) return match.reply
  return fallbacks[index % fallbacks.length]
}
