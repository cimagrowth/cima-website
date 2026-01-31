import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

const JsonLd = ({ schema }: JsonLdProps) => {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <Helmet>
      {schemas.map((s, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default JsonLd;
