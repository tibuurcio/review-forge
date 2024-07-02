import axios from "axios";
import { BaseApi } from "src/api/BaseApi.ts";

export const ReviewApi = {
  getDiff,
} as const;

async function getDiff(reviewLink: string): Promise<string> {
  // return await axios
  //   .post(`http://34.138.3.116:8080/analyze?url=${reviewLink}`)
  //   .then((res) => res.data);
  // return await BaseApi.get('reviewDiff/', reviewLink)
  return Promise.resolve(`diff --git a/CHANGELOG.md b/CHANGELOG.md
index 36d02e8d..effd9c6f 100644
--- a/CHANGELOG.md
+++ b/CHANGELOG.md
@@ -1,3 +1,22 @@
+# [1.17.0-ups-configurable-cookie.2](https://github.com/mParticle/aquarium/compare/v1.17.0-ups-configurable-cookie.1...v1.17.0-ups-configurable-cookie.2) (2024-06-07)
+
+
+### Bug Fixes
+
+* hide minimap after user clicks on a button ([#264](https://github.com/mParticle/aquarium/issues/264)) ([21a399c](https://github.com/mParticle/aquarium/commit/21a399c3afb60bde0737d472db095fba22c41d63))
+
+
+### Features
+
+* minimap active state ([#263](https://github.com/mParticle/aquarium/issues/263)) ([ae9a2b0](https://github.com/mParticle/aquarium/commit/ae9a2b0387b7474d13950078cd5b2ee663848ba7))
+
+# [1.17.0-ups-configurable-cookie.1](https://github.com/mParticle/aquarium/compare/v1.16.1...v1.17.0-ups-configurable-cookie.1) (2024-06-03)
+
+
+### Features
+
+* allows UPS to receive cookie config options instead of only the key ([517d030](https://github.com/mParticle/aquarium/commit/517d03066bb1d55968d650bb7a2a6162a1567ad7))
+
 ## [1.16.1](https://github.com/mParticle/aquarium/compare/v1.16.0...v1.16.1) (2024-06-03)
 
 
diff --git a/package-lock.json b/package-lock.json
index dc29e5d7..7c1af365 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -1,12 +1,12 @@
 {
   "name": "@mparticle/aquarium",
-  "version": "1.16.1",
+  "version": "1.17.0-ups-configurable-cookie.2",
   "lockfileVersion": 3,
   "requires": true,
   "packages": {
     "": {
       "name": "@mparticle/aquarium",
-      "version": "1.16.1",
+      "version": "1.17.0-ups-configurable-cookie.2",
       "license": "Apache-2.0",
       "dependencies": {
         "lodash.clonedeep": "4.5.0"
@@ -48,6 +48,7 @@
         "stylelint-config-recommended": "14.0.0",
         "stylelint-config-standard": "36.0.0",
         "stylelint-no-indistinguishable-colors": "2.1.0",
+        "type-fest": "^4.20.0",
         "typescript": "5.3.3",
         "vite": "5.0.12",
         "vite-plugin-dts": "3.7.2",
@@ -5543,19 +5544,6 @@
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
-    "node_modules/@semantic-release/npm/node_modules/parse-json/node_modules/type-fest": {
-      "version": "4.13.1",
-      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-4.13.1.tgz",
-      "integrity": "sha512-ASMgM+Vf2cLwDMt1KXSkMUDSYCxtckDJs8zsaVF/mYteIsiARKCVtyXtcK38mIKbLTctZP8v6GMqdNaeI3fo7g==",
-      "dev": true,
-      "peer": true,
-      "engines": {
-        "node": ">=16"
-      },
-      "funding": {
-        "url": "https://github.com/sponsors/sindresorhus"
-      }
-    },
     "node_modules/@semantic-release/npm/node_modules/path-key": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/path-key/-/path-key-4.0.0.tgz",
@@ -5589,19 +5577,6 @@
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
-    "node_modules/@semantic-release/npm/node_modules/read-pkg/node_modules/type-fest": {
-      "version": "4.13.1",
-      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-4.13.1.tgz",
-      "integrity": "sha512-ASMgM+Vf2cLwDMt1KXSkMUDSYCxtckDJs8zsaVF/mYteIsiARKCVtyXtcK38mIKbLTctZP8v6GMqdNaeI3fo7g==",
-      "dev": true,
-      "peer": true,
-      "engines": {
-        "node": ">=16"
-      },
-      "funding": {
-        "url": "https://github.com/sponsors/sindresorhus"
-      }
-    },
     "node_modules/@semantic-release/npm/node_modules/semver": {
       "version": "7.6.0",
       "resolved": "https://registry.npmjs.org/semver/-/semver-7.6.0.tgz",
@@ -5686,6 +5661,19 @@
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
+    "node_modules/@semantic-release/npm/node_modules/tempy/node_modules/type-fest": {
+      "version": "2.19.0",
+      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-2.19.0.tgz",
+      "integrity": "sha512-RAH822pAdBgcNMAfWnCBU3CFZcfZ/i1eZjwFU/dsLKumyuuP3niueg2UAukXYF0E2AAoc82ZSSf9J0WQBinzHA==",
+      "dev": true,
+      "peer": true,
+      "engines": {
+        "node": ">=12.20"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/@semantic-release/npm/node_modules/unique-string": {
       "version": "3.0.0",
       "resolved": "https://registry.npmjs.org/unique-string/-/unique-string-3.0.0.tgz",
@@ -5872,19 +5860,6 @@
         "node": ">=10"
       }
     },
-    "node_modules/@semantic-release/release-notes-generator/node_modules/type-fest": {
-      "version": "4.13.1",
-      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-4.13.1.tgz",
-      "integrity": "sha512-ASMgM+Vf2cLwDMt1KXSkMUDSYCxtckDJs8zsaVF/mYteIsiARKCVtyXtcK38mIKbLTctZP8v6GMqdNaeI3fo7g==",
-      "dev": true,
-      "peer": true,
-      "engines": {
-        "node": ">=16"
-      },
-      "funding": {
-        "url": "https://github.com/sponsors/sindresorhus"
-      }
-    },
     "node_modules/@semantic-release/release-notes-generator/node_modules/yallist": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
@@ -6706,6 +6681,18 @@
         "url": "https://opencollective.com/storybook"
       }
     },
+    "node_modules/@storybook/csf/node_modules/type-fest": {
+      "version": "2.19.0",
+      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-2.19.0.tgz",
+      "integrity": "sha512-RAH822pAdBgcNMAfWnCBU3CFZcfZ/i1eZjwFU/dsLKumyuuP3niueg2UAukXYF0E2AAoc82ZSSf9J0WQBinzHA==",
+      "dev": true,
+      "engines": {
+        "node": ">=12.20"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/@storybook/docs-mdx": {
       "version": "3.0.0",
       "resolved": "https://registry.npmjs.org/@storybook/docs-mdx/-/docs-mdx-3.0.0.tgz",
@@ -7000,6 +6987,18 @@
         "node": ">=10"
       }
     },
+    "node_modules/@storybook/react/node_modules/type-fest": {
+      "version": "2.19.0",
+      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-2.19.0.tgz",
+      "integrity": "sha512-RAH822pAdBgcNMAfWnCBU3CFZcfZ/i1eZjwFU/dsLKumyuuP3niueg2UAukXYF0E2AAoc82ZSSf9J0WQBinzHA==",
+      "dev": true,
+      "engines": {
+        "node": ">=12.20"
+      },
+      "funding": {
+        "url": "https://github.com/sponsors/sindresorhus"
+      }
+    },
     "node_modules/@storybook/react/node_modules/yallist": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
@@ -25556,19 +25555,6 @@
         "url": "https://github.com/sponsors/sindresorhus"
       }
     },
-    "node_modules/semantic-release/node_modules/type-fest": {
-      "version": "4.13.1",
-      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-4.13.1.tgz",
-      "integrity": "sha512-ASMgM+Vf2cLwDMt1KXSkMUDSYCxtckDJs8zsaVF/mYteIsiARKCVtyXtcK38mIKbLTctZP8v6GMqdNaeI3fo7g==",
-      "dev": true,
-      "peer": true,
-      "engines": {
-        "node": ">=16"
-      },
-      "funding": {
-        "url": "https://github.com/sponsors/sindresorhus"
-      }
-    },
     "node_modules/semantic-release/node_modules/yallist": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/yallist/-/yallist-4.0.0.tgz",
@@ -27474,12 +27460,12 @@
       }
     },
     "node_modules/type-fest": {
-      "version": "2.19.0",
-      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-2.19.0.tgz",
-      "integrity": "sha512-RAH822pAdBgcNMAfWnCBU3CFZcfZ/i1eZjwFU/dsLKumyuuP3niueg2UAukXYF0E2AAoc82ZSSf9J0WQBinzHA==",
+      "version": "4.20.0",
+      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-4.20.0.tgz",
+      "integrity": "sha512-MBh+PHUHHisjXf4tlx0CFWoMdjx8zCMLJHOjnV1prABYZFHqtFOyauCIK2/7w4oIfwkF8iNhLtnJEfVY2vn3iw==",
       "dev": true,
       "engines": {
-        "node": ">=12.20"
+        "node": ">=16"
       },
       "funding": {
         "url": "https://github.com/sponsors/sindresorhus"
diff --git a/package.json b/package.json
index 07d4b0a1..856b47b0 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
   "name": "@mparticle/aquarium",
-  "version": "1.16.1",
+  "version": "1.17.0-ups-configurable-cookie.2",
   "description": "mParticle Component Library",
   "license": "Apache-2.0",
   "keywords": [
@@ -65,6 +65,7 @@
     "stylelint-config-recommended": "14.0.0",
     "stylelint-config-standard": "36.0.0",
     "stylelint-no-indistinguishable-colors": "2.1.0",
+    "type-fest": "^4.20.0",
     "typescript": "5.3.3",
     "vite": "5.0.12",
     "vite-plugin-dts": "3.7.2",
diff --git a/src/services/user-preferences/user-preferences-service.spec.ts b/src/services/user-preferences/user-preferences-service.spec.ts
index 786bbb2e..212303cd 100644
--- a/src/services/user-preferences/user-preferences-service.spec.ts
+++ b/src/services/user-preferences/user-preferences-service.spec.ts
@@ -51,9 +51,8 @@ describe('When testing the User Preferences Service', () => {
       userPreferencesService = new UserPreferencesService<TestUserPreferenceId>(
         definitions,
         compositeUserPreferencesService,
-        cookieKey,
         lowLevelScope,
-        () => new Date(),
+        { key: cookieKey },
       )
       await userPreferencesService.init()
 
@@ -82,9 +81,8 @@ describe('When testing the User Preferences Service', () => {
       userPreferencesService = new UserPreferencesService<TestUserPreferenceId>(
         definitions,
         compositeUserPreferencesService,
-        cookieKey,
         currentScope,
-        () => new Date(),
+        { key: cookieKey },
       )
       await userPreferencesService.init()
 
@@ -109,9 +107,8 @@ describe('When testing the User Preferences Service', () => {
       userPreferencesService = new UserPreferencesService<TestUserPreferenceId>(
         definitions,
         compositeUserPreferencesService,
-        cookieKey,
         someScope,
-        () => new Date(),
+        { key: cookieKey },
       )
       await userPreferencesService.init()
 
@@ -148,9 +145,8 @@ describe('When testing the User Preferences Service', () => {
         userPreferencesService = new UserPreferencesService<TestUserPreferenceId>(
           definitions,
           compositeUserPreferencesService,
-          cookieKey,
           lowLevelScope,
-          () => new Date(),
+          { key: cookieKey },
         )
         await userPreferencesService.init()
 
@@ -182,9 +178,8 @@ describe('When testing the User Preferences Service', () => {
       userPreferencesService = new UserPreferencesService<TestUserPreferenceId>(
         definitions,
         compositeUserPreferencesService,
-        cookieKey,
         lowLevelScope,
-        () => new Date(),
+        { key: cookieKey },
       )
       await userPreferencesService.init()
 
diff --git a/src/services/user-preferences/user-preferences.ts b/src/services/user-preferences/user-preferences.ts
index f6290bec..608bb9a1 100644
--- a/src/services/user-preferences/user-preferences.ts
+++ b/src/services/user-preferences/user-preferences.ts
@@ -1,10 +1,11 @@
 /* eslint-disable @typescript-eslint/no-extraneous-class,no-unused-vars,@typescript-eslint/no-unused-vars */
-import * as Cookies from '../../utils/Cookies'
 import { type UserPreferences } from 'src/services/user-preferences/models/storage-models/user-preferences'
 import { type CompositeUserPreferences } from 'src/services/user-preferences/models/user-preferences/composite-user-preferences'
 import { type UserPreferenceScope } from 'src/services/user-preferences/models/storage-models/user-preference-scope'
 import { type UserPreferenceDefinitions } from 'src/services/user-preferences/models/definitions/user-preference-definitions'
 import { type CompositeUserPreferencesService } from 'src/services/user-preferences/composite-user-preferences-service'
+import * as Cookies from 'src/utils/Cookies'
+import { type CookieOptions } from 'src/utils/Cookies'
 
 export class UserPreferencesService<TUserPreferenceId extends PropertyKey> {
   public preferences!: CompositeUserPreferences<TUserPreferenceId>
@@ -12,9 +13,8 @@ export class UserPreferencesService<TUserPreferenceId extends PropertyKey> {
   constructor(
     private readonly definitions: UserPreferenceDefinitions<TUserPreferenceId>,
     private readonly compositeUserPreferencesService: CompositeUserPreferencesService<TUserPreferenceId>,
-    private readonly cookieKey: string,
     private readonly currentScope: UserPreferenceScope,
-    public dateFormatter: () => Date,
+    private readonly cookieOptions: CookieOptions & { key: string },
     private readonly onUpdate?: (resolvedPreferences: CompositeUserPreferences<TUserPreferenceId>) => void,
   ) {}
 
@@ -43,7 +43,7 @@ export class UserPreferencesService<TUserPreferenceId extends PropertyKey> {
     // @ts-expect-error
     const { allowedScope } = this.definitions[userPreferenceId]
 
-    const currentStoredPreferences = Cookies.getObject(this.cookieKey)
+    const currentStoredPreferences = Cookies.getObject(this.cookieOptions.key)
 
     const storedPreferences = this.compositeUserPreferencesService.getUpdatedUserPreferenceStorageObject(
       userPreferenceId,
@@ -69,14 +69,11 @@ export class UserPreferencesService<TUserPreferenceId extends PropertyKey> {
   }
 
   private async getStoredPreferences(): Promise<UserPreferences<TUserPreferenceId>> {
-    return await Promise.resolve(Cookies.getObject(this.cookieKey) ?? {})
+    return await Promise.resolve(Cookies.getObject(this.cookieOptions.key) ?? {})
   }
 
   private async setStoredPreferences(storedPreferences: UserPreferences<TUserPreferenceId>): Promise<void> {
-    Cookies.putObject(this.cookieKey, storedPreferences, {
-      expires: this.dateFormatter(),
-      path: '/',
-    })
+    Cookies.putObject(this.cookieOptions.key, storedPreferences, this.cookieOptions)
 
     await Promise.resolve()
   }
diff --git a/src/utils/Cookies.ts b/src/utils/Cookies.ts
index 267b7c3e..61783dd0 100644
--- a/src/utils/Cookies.ts
+++ b/src/utils/Cookies.ts
@@ -1,3 +1,5 @@
+import { RequireOneOrNone } from 'type-fest'
+
 export function get(key: string): string | null {
   const cookies = getAll()
   return cookies?.[key] ? cookies[key] : null
@@ -12,23 +14,58 @@ export function getObject(key: string): string | null {
   return value ? JSON.parse(value) : value
 }
 
-export function put(key: string, value: string | null, options: any /* TODO fix any */ = {}): void {
-  let expires = options.expires
-  if (value == null) expires = 'Thu, 01 Jan 1970 00:00:01 GMT'
-  if (typeof expires === 'string') expires = new Date(expires)
+export type CookieOptions = RequireOneOrNone<
+  {
+    path?: string
+    domain?: string
+    secure?: boolean
+    expiresISOString: string
+    permanent: boolean
+  },
+  'expiresISOString' | 'permanent'
+>
+
+export function put(key: string, value: string | null, options: CookieOptions = {}): void {
   let str = \`\${_encode(key)}=\${value != null ? _encode(value) : ''}\`
   if (options.path) str += \`; path=\${options.path}\`
   if (options.domain) str += \`; domain=\${options.domain}\`
-  if (options.expires) str += \`; expires=\${expires.toUTCString()}\`
+  if (options.permanent || options.expiresISOString)
+    str += \`; expires=\${calculateExpires(value, options.permanent, options.expiresISOString)}\`
   if (options.secure) str += '; secure'
   document.cookie = str
 }
 
-export function putObject(key: string, value: Record<string, unknown>, options = {}): void {
+/**
+ * This code came from the aurelia-cookie plugin initially and the way they remove a cookie
+ * is by calling the put method with a null value and the same options as the cookie that needs to be removed.
+ *
+ * This null value makes the cookie expire immediately by setting the expires attribute to a date in the past.
+ * I'm keeping the same logic, but we should consider using a more robust library for cookie management.
+ *
+ * If we don't set the expires option, the cookie Expires property in the browser becomes "Session", which
+ * doesn't seem to have a predictable behaviour across different browsers.
+ *
+ * @see https://stackoverflow.com/questions/4132095/when-does-a-cookie-with-expiration-time-at-end-of-session-expire
+ */
+function calculateExpires(value: string | null, permanent?: boolean, expires?: string): string {
+  const defaultExpires = 'Thu, 01 Jan 1970 00:00:01 GMT'
+
+  if (value === null) {
+    return defaultExpires
+  }
+
+  if (permanent) {
+    return 'Sat, 31 Dec 2044 23:59:59 GMT'
+  }
+
+  return expires ?? defaultExpires
+}
+
+export function putObject(key: string, value: Record<string, unknown>, options: CookieOptions = {}): void {
   put(key, JSON.stringify(value), options)
 }
 
-export function remove(key: string, options = {}): void {
+export function remove(key: string, options: CookieOptions = {}): void {
   put(key, null, options)
 }
 `)
}
