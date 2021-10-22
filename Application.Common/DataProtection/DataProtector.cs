using Microsoft.AspNetCore.DataProtection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Application.EntitiesModels.Models;
using Application.DAL;
using System.Linq;
using Application.EntitiesModels.Models.DataProtection;
using Application.EntitiesModels.Entities;

namespace Application.Common.DataProtection
{
    public class DataProtector
    {
        private IDataProtector _protector;
        private readonly string salt = "CustomSolutionsLtd";
        private readonly IDbContextFactory _dbContextFactory;
        private readonly IDataProtectionProvider _provider;

        public DataProtector(IDbContextFactory dbContextFactory, IDataProtectionProvider provider)
        {
            _provider = provider;
            _dbContextFactory = dbContextFactory;
        }

        public void RefreshKey()
        {
            using (var _context = _dbContextFactory.Create())
            {
                var keys = _context.CryptKeys;
                _protector = _provider.CreateProtector(keys.OrderBy(k => k.ChangingDate).Select(x => x.Value).Last() + salt);
            }
        }

        public void RefreshKey(string key)
        {
            using (var _context = _dbContextFactory.Create())
            {
                _protector = _provider.CreateProtector(key + salt);
            }
        }

        public string Encrypt(string plaintext)
        {
            RefreshKey();
            if (plaintext == null)
            {
                return null;
            }
            else
            {
                return _protector.Protect(plaintext);
            }
        }

        public string Encrypt(string plaintext, string key)
        {
            RefreshKey(key);
            if (plaintext == null)
            {
                return null;
            }
            else
            {
                return _protector.Protect(plaintext);
            }
        }

        public string Decrypt(string encryptedText)
        {
            RefreshKey();
            if (encryptedText == null)
            {
                return null;
            }
            else
            {
                try
                {
                    return _protector.Unprotect(encryptedText);
                }
                catch (CryptographicException e)
                {
                    return "";
                }
            }
        }

        public string Decrypt(string encryptedText, string key)
        {
            RefreshKey(key);
            if (encryptedText == null)
            {
                return null;
            }
            else
            {
                try
                {
                    return _protector.Unprotect(encryptedText);
                }
                catch (CryptographicException e)
                {
                    return "";
                }
            }
        }

        public string DecryptEncrypt(string plainText)
        {
            using (var _context = _dbContextFactory.Create())
            {
                var keys = _context.CryptKeys.ToList();
                var lastKey = keys[keys.Count - 1].Value;
                var prelastKey = keys[keys.Count - 2].Value;
                var originalValue = Decrypt(plainText, prelastKey);
                return Encrypt(originalValue, lastKey);
            }
        }
    }
}
