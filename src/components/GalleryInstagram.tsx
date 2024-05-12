"use client";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import ShareIcon from "@mui/icons-material/Share";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function GalleryInstagram() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,thumbnail_url,timestamp,media_type,permalink&access_token=${process.env.NEXT_PUBLIC_VERCEL_INSTAGRAM_KEY}`; // tokens developer facebook
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const openModal = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const renderCaptionWithLinks = (caption: any) => {
    const mentionRegex = /@([a-zA-Z0-9_.]+)/g;
    const hashtagRegex = /#(\w+)/g;

    const captionWithMentionLinks = caption.replace(
      mentionRegex,
      '<a target="_blank" href="https://instagram.com/$1">@$1</a>'
    );

    const captionWithHashtagLinks = captionWithMentionLinks.replace(
      hashtagRegex,
      '<a target="_blank" href="https://www.instagram.com/explore/tags/$1/">#$1</a>'
    );

    return (
      <div dangerouslySetInnerHTML={{ __html: captionWithHashtagLinks }} />
    );
  };

  const openInInstagram = () => {
    if (selectedPost) {
      const permalink = (selectedPost as { permalink: string }).permalink;
      window.open(permalink, "_blank");
    }
  };

  const copyPermalink = () => {
    if (selectedPost) {
      const permalink = (selectedPost as { permalink: string }).permalink;
      navigator.clipboard.writeText(permalink);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto gap-3 flex flex-wrap justify-center">
        {posts.map(
          (post: {
            media_url: string | undefined;
            thumbnail_url: string | undefined;
            id: string | undefined;
            caption: string | undefined;
            media_type: string | undefined;
          }) => (
            <div key={post.id} className="flex justify-center">
              {post.media_type === "VIDEO" ? (
                <div className="w-[172px] h-[172px] sm:w-[200px] sm:h-[200px] md:w-[172px] md:h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[200px] overflow-hidden rounded-xl">
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <Image
                      onClick={() => openModal(post)}
                      alt={post.id}
                      className="object-cover w-full h-full cursor-pointer"
                      src={post.thumbnail_url}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-[172px] h-[172px] sm:w-[200px] sm:h-[200px] md:w-[172px] md:h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[200px] overflow-hidden rounded-xl">
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <Image
                      onClick={() => openModal(post)}
                      alt={post.id}
                      className="object-cover rounded-xl w-full h-[172px] sm:w-[200px] sm:h-[200px] md:w-[172px] md:h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[200px] cursor-pointer"
                      src={post.media_url}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        placement="center"
        backdrop="blur"
        scrollBehavior="inside"
        shadow="lg"
        className="mr-4 ml-4"
      >
        <ModalContent>
          <ModalHeader className="text-center">Detail Postingan</ModalHeader>
          <ModalBody>
            {selectedPost && (
              <>
                {(selectedPost as { media_type: string }).media_type ===
                "VIDEO" ? (
                  <video
                    controls
                    className="object-cover w-full h-full"
                    src={(selectedPost as { media_url: string }).media_url}
                  />
                ) : (
                  <Image
                    className="object-cover w-full h-full"
                    src={(selectedPost as { media_url: string }).media_url}
                    alt={(selectedPost as { id: string }).id}
                  />
                )}
                <p>
                  {renderCaptionWithLinks(
                    (selectedPost as { caption: string }).caption
                  )}
                </p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="flat" onClick={openInInstagram}>
              <InstagramIcon />
              <p>Buka di Instagram</p>
            </Button>
            <Popover placement="left">
              <PopoverTrigger>
                <Button color="success" variant="flat" onClick={copyPermalink}>
                  <ShareIcon />
                  <p>Share</p>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Clipboard</div>
                  <div className="text-tiny">Link berhasil disalin!</div>
                </div>
              </PopoverContent>
            </Popover>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
