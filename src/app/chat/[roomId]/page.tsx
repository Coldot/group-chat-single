import ChatRoom from '../../../components/ChatRoom';

export default async function ChatPage({ params, searchParams }: { 
  params: Promise<{ roomId: string }>, 
  searchParams: Promise<{ nickname: string }> 
}) {
  const {roomId} = await params;
  const {nickname} = await searchParams;

  return <ChatRoom roomId={roomId} nickname={nickname} />;
}