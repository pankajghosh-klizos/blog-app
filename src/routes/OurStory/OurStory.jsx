import { Container } from "../../components";
import "./OurStory.scss";

const OurStory = () => {
  return (
    <Container>
      <div className="py-5">
        <h1 className="display-1 fw-semibold mb-5 lh-1 playfair">
          Everyone has a <span className="d-block lh-1">story to tell</span>
        </h1>
        <p className="fs-4">
          <strong className="fw-semibold">ReadMe.</strong> is a home for human
          stories and ideas. Here, anyone can share knowledge and wisdom with
          the world—without having to build a mailing list or a following first.
          The internet is noisy and chaotic; ReadMe. is quiet yet full of
          insight. It’s simple, beautiful, collaborative, and helps you find the
          right readers for whatever you have to say.
        </p>
        <p className="fs-4">
          We believe that what you read and write matters. Words can divide or
          empower us, inspire or discourage us. In a world where the most
          sensational and surface-level stories often win, we’re building a
          system that rewards depth, nuance, and time well spent. A space for
          thoughtful conversation more than drive-by takes, and substance over
          packaging.
        </p>
        <p className="fs-4">
          Over 100 million people connect and share their wisdom on ReadMe.
          every month. They’re software developers, amateur novelists, product
          designers, CEOs, and anyone burning with a story they need to get out
          into the world. They write about what they’re working on, what’s
          keeping them up at night, what they’ve lived through, and what they’ve
          learned that the rest of us might want to know too.
        </p>
        <p className="fs-4">
          Instead of selling ads or selling your data, we’re supported by a
          growing community of over a million ReadMe. members who believe in our
          mission. If you’re new here, start reading. Dive deeper into whatever
          matters to you. Find a post that helps you learn something new, or
          reconsider something familiar—and then write your story.
        </p>
      </div>
    </Container>
  );
};

export default OurStory;
