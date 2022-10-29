import { extractCritical } from "@emotion/server";
import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { resetServerContext } from "react-beautiful-dnd";

//const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
    static async getInitialProps(ctx) {
        const page = await ctx.renderPage();
        const initialProps = await Document.getInitialProps(ctx);
        const styles = extractCritical(page.html);
        resetServerContext();
        return { ...initialProps, ...page, ...styles };
    }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
