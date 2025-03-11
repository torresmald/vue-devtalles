import { useChat } from '@/composables/useChat';
import { describe, expect, test, vi } from 'vitest';

describe('useChat', () => {
  test('should add messages', async () => {
    const text = 'Hola Mundo';
    const { messages, onAddMessages } = useChat();

    await onAddMessages(text);
    expect(messages.value[0]).toEqual({
      id: expect.any(Number),
      isMine: true,
      message: text,
    });
  });

  test('do nothing if text is empty', async () => {
    const { messages, onAddMessages } = useChat();

    await onAddMessages('');
    expect(messages.value.length).toBe(0);
  });

  test('should be answer if the text ends with ?', async () => {
    const text = 'Hola Mundo?';

    const { messages, onAddMessages } = useChat();

    await onAddMessages(text);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const [mine, her] = messages.value;
    expect(messages.value.length).toBe(2);
    expect(mine.isMine).toBeTruthy();
    expect(mine).toEqual({
      id: expect.any(Number),
      isMine: true,
      message: text,
    });
    expect(her).toEqual({
      id: expect.any(Number),
      isMine: false,
      message: expect.any(String),
      image: expect.any(String),
    });
  });

  test('test response api', async () => {
    (window as unknown).fetch = vi.fn(async () => ({
      json: async () => ({
        answer: 'yes',
        image: 'https://yesno.wtf/assets/yes/1.gif',
      }),
    }));

    const text = 'Quieres cafe?';
    const { messages, onAddMessages } = useChat();

    await onAddMessages(text);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const [, her] = messages.value;
    expect(messages.value.length).toBe(2);

    expect(her).toEqual({
      id: expect.any(Number),
      isMine: false,
      message: expect.any(String),
      image: expect.any(String),
    });
  });
});
