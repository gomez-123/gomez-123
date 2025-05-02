Paso 1: Crear un repositorio en GitHub
Accede a GitHub e inicia sesión.

En la esquina superior derecha, haz clic en el icono de + y selecciona "Nuevo repositorio".

Asigna un nombre a tu repositorio (puede ser el mismo que la carpeta, como sisgestion-escolar).

Decide si deseas que el repositorio sea público o privado.

Haz clic en Crear repositorio.

Paso 2: Preparar tu carpeta localmente
Abre una terminal (o el terminal integrado en Visual Studio Code).

Navega a la carpeta que quieres subir. Usa el siguiente comando para moverte a tu carpeta:

bash
Copiar
Editar
cd ruta/a/tu/carpeta/sisgestion-escolar
Inicializa un repositorio Git en esa carpeta:

bash
Copiar
Editar
git init
Paso 3: Conectar tu repositorio local con GitHub
Copia la URL de tu repositorio de GitHub. Debería verse algo así: https://github.com/tu-usuario/sisgestion-escolar.git.

Agrega esa URL como remoto en tu repositorio local:

bash
Copiar
Editar
git remote add origin https://github.com/tu-usuario/sisgestion-escolar.git
Paso 4: Agregar archivos y hacer un primer commit
Agrega todos los archivos de tu carpeta al repositorio local:

bash
Copiar
Editar
git add .
Realiza un commit con un mensaje descriptivo:

bash
Copiar
Editar
git commit -m "Primer commit - Subida de la carpeta sisgestion-escolar"
Paso 5: Subir los cambios a GitHub
Sube los archivos a tu repositorio en GitHub:

bash
Copiar
Editar
git push -u origin master

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
